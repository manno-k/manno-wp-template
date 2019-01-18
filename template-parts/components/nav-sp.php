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
