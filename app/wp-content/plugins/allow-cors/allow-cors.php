<?php
/**
 * Plugin Name: Allow CORS for Vercel Frontend
 * Description: Enables REST API CORS support for Next.js frontend at final-costa-96iu.vercel.app
 * Version: 1.0
 * Author: Your Name
 */

add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://final-costa-96iu.vercel.app');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
}, 15);
