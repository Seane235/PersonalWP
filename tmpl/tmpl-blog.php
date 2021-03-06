<?php /* Template Name: Blog Listing */ ?>


<?php get_header(); ?>
<?php get_template_part('partials/hero'); ?>
<?php get_template_part('partials/navbar'); ?>
<div id="blog-list">
	<div class="content-wrapper">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="blog-wrapper col-md-6">
				<div class="heading-wrapper">
					<h2>Blog</h2>
					<div class="subheading">Web Development | Web Design</div>
				</div>

				<?php $counter = 1; $posts = get_posts(array(
					'posts_per_page' => '10',
					)); foreach($posts as $post ) : setup_postdata($post); ?>
					<div class="blog-post">
						<a href="<?php the_permalink(); ?>">
							<div class="counter">
								<hr>
								<div class="num"><?php echo $counter; ?></div>
							</div>
							<div class="date">
								<span class="month">
									<?php the_time('M'); ?>
								</span>
								<hr>
								<span class="day">
									<?php the_time('j'); ?>
								</span>
							</div>
							<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'large' ); ?>
							<div style="background-image: url('<?php echo $url ?>');" class="thumb-wrapper">

							</div>
						</a>
						<div class="blog-title-wrapper">
							<h4><?php $title = $post->post_title; if(!empty($title)){echo $title;} ?></h4>
							<div class="tag-wrapper">
						<?php $tags = wp_get_post_categories($post->ID); ?>
						<?php if( !empty($tags) ) : foreach ($tags as $tag) : $c = get_category($tag);?>
							<span class="tag tag-<?php echo $tag->title; ?>">
								<a href="/category/<?php echo $c->slug; ?>">
									<?php echo $c->name; ?>
								</a>
							</span>
						<?php endforeach; endif; ?>
						</div>
						</div>
						<div class="excerpt">
							<?php the_excerpt(); ?>
						</div>
					</div>
					<?php $counter++; endforeach; wp_reset_postdata(); ?>

				</div>
				<div class="col-md-3">
				 <?php $categories = get_categories(array(
				 	'number' => 4
				 )); ?> 
					<div class="categories">
						<div class="categories-title">
							Categories
						</div>
						<ul class="categories-list">
							<?php foreach($categories as $c) : ?>
								<li><?php echo $c->name; ?></li>
							<?php endforeach; ?>
						</ul>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
	<?php get_footer(); ?>