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
