package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer{
	@Value("${file.root}")
	private String root;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		// 리뷰게시판 썸네일 이미지
	    registry.addResourceHandler("/board/review/thumbnail/**")
	            .addResourceLocations("file:///" + root + "/review/thumbnail/");
	    
	    // 리뷰게시판 Content 이미지
        registry
        .addResourceHandler("/board/review/content/**")
        .addResourceLocations("file:///" + root + "/review/content/");
	}
}// WebConfig
