package kr.co.iei.designer.model.dto;

import java.util.List;

import kr.co.iei.member.model.dto.MemberDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDesignerDTO {
	private List<DesignerDTO> designerList;
	private List<MemberDTO> memberList;
}
