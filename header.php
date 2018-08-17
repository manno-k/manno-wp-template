<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wordpress_template
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<header id="masthead" class="site-header">
	<div class="site-branding">
		<?php
		the_custom_logo();
		if ( is_front_page() && is_home() ) : ?>
			<h1 class="site-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php else : ?>
			<p class="site-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
		<?php
		endif;

		$description = get_bloginfo( 'description', 'display' );
		if ( $description || is_customize_preview() ) : ?>
			<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
		<?php
		endif; ?>
	</div><!-- .site-branding -->

	<nav class="c-nav__sp">
		<button type="button" class="js-offcanvas-btn js-offcanvas-btn-right">
			<span class="sr-only">Toggle navigation</span>
			<span class="hiraku-open-btn-line"></span>
		</button>
		<div class="js-offcanvas-right">
			<div class="c-nav__sp-search">
				<?php get_search_form(); ?>
			</div>
			<?php
			$defaults = array(
				'menu'            => '',
				'container'       => 'div',
				'container_class' => 'list-group',
				'fallback_cb'     => 'wp_page_menu',
			);
			wp_nav_menu( $defaults );
			?>
		</div>
	</nav><!-- #site-navigation -->
	<nav class="c-nav__pc">
		<?php
		$defaults = array(
			'menu'            => '',
			'container'       => 'div',
			'container_class' => 'list-group',
			'fallback_cb'     => 'wp_page_menu',
		);
		wp_nav_menu( $defaults );
		?>
	</nav>
</header><!-- #masthead -->

