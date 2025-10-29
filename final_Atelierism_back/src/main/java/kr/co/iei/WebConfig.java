package kr.co.iei;

		import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
		import org.springframework.context.annotation.Configuration;
		import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
		import org.springframework.web.socket.config.annotation.EnableWebSocket;
		import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
		import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer, WebSocketConfigurer{
	@Value("${file.root}")
	private String root;
	@Bean
	public BCryptPasswordEncoder bCrypt() {
		return new BCryptPasswordEncoder();
	}
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		//registry
			//.setAllowedOrigins("*");
	}
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		// 리뷰게시판 썸네일 이미지
	    registry.addResourceHandler("/board/review/thumbnail/**")
	            .addResourceLocations("file:///" + root + "/review/thumbnail/");
	    
	    // 리뷰게시판 Content 이미지
        registry
        .addResourceHandler("/board/review/content/**")
        .addResourceLocations("file:///" + root + "/review/content/");
	    registry.addResourceHandler("/board/review/**")
	            .addResourceLocations("file:///" + root + "/review/");
	    
	    // 문의용 컨텐츠 이미지 매핑 추가
	    registry.addResourceHandler("/board/inquiry/content/**")
	            .addResourceLocations("file:///" + root + "/inquiry/content/");
	    
	 // 회원 프로필 이미지 매핑
	    registry.addResourceHandler("/memberProfile/**")
        .addResourceLocations("file:///" + root + "/memberProfile/");
	}
	
}// WebConfig
