import { COLORS } from "@/style/color";
import styled from "@emotion/styled";

const Typography = ({
  children,
  fontSize,
  color,
  fontWeight,
  textAlign,
}: {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  textAlign?: string;
}) => {
  return (
    <Typo
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      textAlign={textAlign}
    >
      {children}
    </Typo>
  );
};

export default Typography;

const Typo = styled.div<{
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: string;
}>`
  font-size: ${(props) => props.fontSize || 14}px;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 400};
  line-height: normal;
  color: ${(props) => props.color || COLORS.WHITE};
  text-align: ${(props) => props.textAlign || "left"};
`;
