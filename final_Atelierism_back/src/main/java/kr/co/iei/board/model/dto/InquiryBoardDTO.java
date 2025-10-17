package kr.co.iei.board.model.dto;

import org.apache.ibatis.type.Alias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="inquiry")
public class InquiryBoardDTO {
	private int inquiryBoardNo;				// 게시판 번호
	private String inquiryBoardTitle;		// 게시판 제목
	private String inquiryBoardWriterId;	// 작성자(member_id)참조
	private String inquiryBoardContent;		// 게시판 내용
	private int inquiryBoardOption;			// 공개글/비밀글 확인 여부(1: 공개 / 2: 비밀글)
	private int inquiryBoardStatus;			// 답변 상태 여부(1: 답변대기 / 2: 답변완료) 관리자 답변 여부
	private String inquiryBoardDate;		// 게시글 등록 날짜
}
