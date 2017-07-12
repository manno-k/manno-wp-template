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

// nav_menu aタグに任意のclassを追加
add_filter('walker_nav_menu_start_el', 'add_class_on_link', 10, 4);
 function add_class_on_link($item_output, $item){
 return preg_replace('/(<a.*?)/', '$1' . " class='nav-link'", $item_output);
}
