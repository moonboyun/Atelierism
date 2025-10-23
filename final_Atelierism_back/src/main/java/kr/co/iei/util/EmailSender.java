package kr.co.iei.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Component
public class EmailSender {

	@Autowired
	private JavaMailSender mailSender;
	
	public void sendMail(String mailTitle, String receiver, String mailContent) {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		
		try {
			helper.setSentDate(new Date());//메일 전송 시간
			helper.setFrom(new InternetAddress("whtjdqls0903@gmail.com"));//보내는 사람
			helper.setTo(receiver);//받는 사람
			helper.setSubject(mailTitle);
			helper.setText(mailContent);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
