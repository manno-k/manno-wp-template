<?php
/**
 * Load Advanced Custom Fields functions file.
 */

/*
 * ACF Options setting.
 *
 * Doc https://www.advancedcustomfields.com/add-ons/options-page/
 */
//
//if( function_exists('acf_add_options_page') ) {
//
//	acf_add_options_page(array(
//		'page_title' 	=> '共通オプション設定',
//		'menu_title'	=> '共通オプション',
//		'menu_slug' 	=> 'theme-options',
//		'capability'	=> 'edit_posts',
//		'parent_slug'	=> '',
//		'position'	=> false,
//		'redirect'	=> false,
//	));
//
//}

/**
 * ACF JSON 保存先
 */

add_filter('acf/settings/save_json', 'my_acf_json_save_point');

function my_acf_json_save_point( $path ) {

	// update path
	$path = get_stylesheet_directory() . '/acf-json';


	// return
	return $path;

}

/**
 * ACF JSON 読み込み先
 */


add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point( $paths ) {

	// remove original path (optional)
	unset($paths[0]);


	// append path
	$paths[] = get_stylesheet_directory() . '/acf-json';


	// return
	return $paths;

}
