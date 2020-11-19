<nav class="c-menu c-menu__pc">
	<?php
		$defaults = array(
			'menu'            => 'header_nav-pc',
			'container_class' => 'list-group',
			'fallback_cb'     => 'wp_page_menu',
		);
		wp_nav_menu($defaults);
	?>
</nav>

<nav class="js-drawer drawer--top c-menu c-menu__sp">
	<button type="button" class="drawer-toggle drawer-hamburger d-lg-none">
		<span class="sr-only">toggle navigation</span>
		<span class="drawer-hamburger-icon"></span>
	</button>
	<nav class="c-menu__sp-inner drawer-nav" role="navigation">
		<img class="c-menu__sp-logo" src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/img/logo/logo-menu.png" alt="menu logo"/>
		<?php
			$defaults = array(
				'menu'            => 'header_nav',
				'container_class' => 'list-group',
				'fallback_cb'     => 'wp_page_menu',
			);
			wp_nav_menu($defaults);
		?>
		<span class="u-text-green">デリケートゾーン専門サロン</span>
	</nav>
</nav>
