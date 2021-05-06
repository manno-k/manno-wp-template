<?php
	/**
	 * Custom Posts Settings
	 */


	function create_post_type()
	{
		$exampleSupports = [
			'title',
			'editor',
			'thumbnail',
			'revisions',
			'post-formats',
			'custom-fields',
			'page-attributes',
			'excerpt'
		];

		register_post_type('custom-posts',  // カスタム投稿名
			array(
				'label'        => 'カスタム投稿',  // 管理画面の左メニューに表示されるテキスト
				'public'       => true,  // 投稿タイプをパブリックにするか否か
				'has_archive'  => true,  // アーカイブを有効にするか否か
				'supports'     => $exampleSupports,  // 投稿画面でどのmoduleを使うか的な設定
				'hierarchical' => true,
			)
		);
		register_taxonomy('taxonomy', 'custom-posts',
			array(
				'label'              => 'カテゴリー', // ラベルを指定。個別に指定したい場合は'labels'を使う
				'public'             => true, // タクソノミーは（パブリックに）検索可能にするかどうか。
				'show_in_quick_edit' => true, // 投稿のクイック編集でこのタクソノミーを表示するかどうか
				'show_admin_column'  => true, // 投稿一覧のテーブルにこのタクソノミーのカラムを表示するかどうか
				'hierarchical'       => true, // trueの場合はカテゴリーのような階層あり（子を持つ）タクソノミー、falseの場合はタグのような階層化しないタクソノミーになる
				'rewrite'            => array( // タクソノミーのパーマリンクのリライト方法を変更
					'slug'         => 'items', // パーマリンク構造のスラッグを変更
					'with_front'   => false, // パーマリンクの前にfrontベースを入れるかどうか
					'hierarchical' => true, // 階層化したURLを使用可能にするかどうか
				),
			)
		);

	}

	add_action('init', 'create_post_type'); // アクションに上記関数をフックします

	/*
	日付順に並べ替え
	*/
	function admin_custom_posttype_order($wp_query)
	{
		if (is_admin()) {
			$post_type = $wp_query->query['post_type'];
			$wp_query->set('orderby', 'date'); //並べ替えの基準(日付)
			$wp_query->set('order', 'DESC'); //新しい順。古い順にしたい場合はASCを指定
		}
	}

	add_filter('pre_get_posts', 'admin_custom_posttype_order');

?>
