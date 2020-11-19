package kr.co.assemble.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@PropertySource("classpath:/mail.properties")
@Configuration
public class MailSenderConfig extends JavaMailSenderImpl {

    @Value("${host}")
    String host;
    @Value("${port}")
    String port;
    @Value("${user}")
    String user;
    @Value("${password}")
    String pass;


    @Bean
    public JavaMailSenderImpl mailSender(){

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        System.out.println(user);
        mailSender.setPassword(pass);
        mailSender.setUsername(user);
        mailSender.setHost(host);
        mailSender.setPort(Integer.parseInt(port));
        mailSender.setJavaMailProperties(getMailProperties());

        return mailSender;
    }

    private Properties getMailProperties(){
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable","true");
        properties.put("mail.debug", "true");
//        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        properties.put("mail.transport.protocol", "smtp");
        return properties;


    }


}
