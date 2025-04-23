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
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header id="masthead" class="l-header sticky-top">
	<div class="container">
		<div class="row">
			<div class="site-branding l-header__left col-12 col-lg-6">
				<?php
					if (is_front_page() && is_home()) : ?>
						<h1 class="site-title l-header__logo">
							<?php the_custom_logo(); ?>
							<div class="sr-only">
								<?php bloginfo('name'); ?>
							</div>
						</h1>
					<?php else : ?>
						<p class="site-title l-header__logo">
							<?php the_custom_logo(); ?>
							<span class="sr-only"><?php bloginfo('name'); ?></span>
						</p>
					<?php endif; ?>
			</div><!-- .site-branding -->
			<div class="l-header__right col-lg-6 align-self-center">
				<?php get_template_part('template-parts/components/nav'); ?>
			</div>
		</div>
	</div>
</header><!-- #masthead -->
