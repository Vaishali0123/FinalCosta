<?php
/**
 * Plugin Name: Allow CORS for Next.js
 * Description: Allows requests from your Next.js frontend (Vercel) to WordPress REST API.
 * Version: 1.0
 * Author: Your Name
 */

add_action( 'rest_api_init', function() {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        // Allow ONLY your frontend domain
        header( 'Access-Control-Allow-Origin: https://final-costa-96iu.vercel.app' );
        header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
        header( 'Access-Control-Allow-Credentials: true' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
        return $value;
    });
}, 15 );
