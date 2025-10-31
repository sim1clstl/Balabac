<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array<string>|string|null
     */
    protected $proxies = null;

    // No $headers override — use framework defaults.
}
