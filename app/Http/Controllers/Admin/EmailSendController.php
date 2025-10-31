<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\GenericTemplateMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class EmailSendController extends Controller
{
    /** Map dropdown keys -> file + default subject + known placeholders */
    private const TEMPLATES = [
        'unpaid' => [
            'file' => 'UnpaidBooking.html',
            'subject' => 'Payment Reminder – The Palawan Tour',
            'placeholders' => ['Customer Name','Number of People','Booking ID','PAYMENT_PORTAL_URL','UPLOAD_RECEIPT_URL']
        ],
        'before' => [
            'file' => 'BeforeTrip.html',
            'subject' => 'Your Adventure is Almost Here!',
            'placeholders' => ['Customer Name','Tour Package Name','Package Name','Tour Date','Pickup Time','Pickup Address','CHECK_BOOKING_URL']
        ],
        'after' => [
            'file' => 'AfterTrip.html',
            'subject' => 'Thank You for Traveling with Us!',
            'placeholders' => ['Customer Name','REVIEW_URL','FACEBOOK_URL','INSTAGRAM_URL','TWITTER_URL']
        ],
        'change_approval' => [
            'file' => 'ChangeApproval.html',
            'subject' => 'Reschedule Approved – Updated Booking Details',
            'placeholders' => ['Customer Name','Full Name','New Tour Start Date','New Tour End Date','Package Name','Guest Count','Pickup Address','Amount','CHECK_BOOKING_URL','CONTACT_URL']
        ],
        'reschedule' => [
            'file' => 'Reschedule.html',
            'subject' => 'Important Update: Tour Rescheduled',
            'placeholders' => ['Customer Name','Original Tour Date','New Tour Start Date','New Tour End Date','Package Name','Pickup Address','Guest Count','CONFIRM_NEW_DATE_URL','REFUND_OR_CHANGE_URL']
        ],
        'refund_ack' => [
            'file' => 'RefundAcknowledgement.html',
            'subject' => 'Refund Processed – The Palawan Tour',
            'placeholders' => ['Customer Name','Booking Reference #','Package Name','Refund Amount','Payment Method','Processed Date','CONTACT_URL']
        ],
    ];

    public function create()
    {
        // If using Inertia React, just return template metadata:
        return inertia('Admin/EmailSend', [
            'templates' => collect(self::TEMPLATES)->map(fn($t, $key) => [
                'key' => $key,
                'label' => $this->labelFor($key),
                'defaultSubject' => $t['subject'],
                'placeholders' => $t['placeholders'],
            ])->values(),
        ]);
    }

    public function send(Request $request)
    {
        $templateKeys = array_keys(self::TEMPLATES);

        $data = $request->validate([
            'to' => ['required','email'],
            'template' => ['required', Rule::in($templateKeys)],
            'subject' => ['nullable','string','max:150'],
            // placeholders come as { "Customer Name": "Ana", "Booking ID": "PWT-123", ... }
            'vars' => ['nullable','array'],
        ]);

        $tpl = self::TEMPLATES[$data['template']];
        $subject = $data['subject'] ?: $tpl['subject'];

        // 1) Load raw HTML
        $path = resource_path('email-templates/'.$tpl['file']);
        if (!is_file($path)) {
            abort(422, 'Template file missing: '.$tpl['file']);
        }
        $html = file_get_contents($path);

        // 2) Replace placeholders like [Customer Name] with provided values.
        // We’ll replace both [Foo] and [Foo Bar] etc.
        $replacements = [];
        foreach (($data['vars'] ?? []) as $key => $value) {
            $replacements['['.$key.']'] = e($value); // XSS-safe
        }
        $html = strtr($html, $replacements);

        // 3) Send
        Mail::to($data['to'])->send(new GenericTemplateMail($subject, $html));

        return back()->with('flash', 'Email sent to '.$data['to']);
    }

    private function labelFor(string $key): string
    {
        return match($key) {
            'unpaid' => 'Unpaid Booking (Reminder)',
            'before' => 'Before Trip (Info Pack)',
            'after' => 'After Trip (Thank You)',
            'change_approval' => 'Change Approval (Reschedule OK)',
            'reschedule' => 'Reschedule Notice (Weather, etc.)',
            'refund_ack' => 'Refund Acknowledgement',
            default => ucfirst($key),
        };
    }
}
