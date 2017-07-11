<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
//自作スクリプトの読み込み
function my_scripts_method() {
	wp_enqueue_script('tether',get_bloginfo('stylesheet_directory').'/src/js/tether.min.js', array(), '1.0', true);
	wp_enqueue_script('bootstrap',get_bloginfo('stylesheet_directory').'/src/js/bootstrap.js', array(), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
