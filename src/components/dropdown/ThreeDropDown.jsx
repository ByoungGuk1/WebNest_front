// components/dropdown/ThreeDropDown.jsx
import useDropDown from "../../hooks/useDropDown";
import S from "../../pages/quiz/quizdropdown/style";
import React, { useEffect, useMemo, useState, forwardRef } from "react";

/* 드롭다운 항목 */
const ITEMS = [
  { value: "latest",  label: "최신순" },
  { value: "comment", label: "댓글순" },
  { value: "popular", label: "인기순" },
];

/* DOM 경고 방지용 */
const NoDomSelectButton = forwardRef(({ select, selected, ...rest }, ref) => <button ref={ref} {...rest} />);
NoDomSelectButton.displayName = "NoDomSelectButton";
const NoDomDroppedDiv = forwardRef(({ $isDropped, ...rest }, ref) => <div ref={ref} {...rest} />);
NoDomDroppedDiv.displayName = "NoDomDroppedDiv";

/* color 객체 정규화 */
const normalizeColors = (color) => {
  const c = (typeof color === "object" && color) ? color : {};
  return {
    buttonBg:      c.buttonBg,
    buttonFg:      c.buttonFg,
    buttonBorder:  c.buttonBorder,
    buttonHoverBg: c.buttonHoverBg,
    menuBg:        c.menuBg,
    itemFg:        c.itemFg,
    itemHoverBg:   c.itemHoverBg,
    itemHoverFg:   c.itemHoverFg,
  };
};

const ThreeDropDown = ({ value = "latest", onChange, color }) => {
  const [open, ref, handler] = useDropDown();
  const [selected, setSelected] = useState(value);

  // hover 상태 (버튼/항목)
  const [btnHover, setBtnHover] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(-1);

  useEffect(() => { setSelected(value); }, [value]);

  const C = useMemo(() => normalizeColors(color), [color]);

  const labelOf = (v) => ITEMS.find((i) => i.value === v)?.label ?? "정렬";

  const select = (v) => {
    setSelected(v);
    onChange?.(v);
    handler();
  };

  // 버튼 스타일 (hover 반영)
  const buttonStyle = useMemo(() => {
    const next = {};
    if (C.buttonFg) next.color = C.buttonFg;
    if (C.buttonBorder) next.borderColor = C.buttonBorder;
    if (C.buttonBg) next.backgroundColor = btnHover ? (C.buttonHoverBg || C.buttonBg) : C.buttonBg;
    return next; // inline style이므로 최우선 적용
  }, [C, btnHover]);

  // 메뉴 래퍼 스타일
  const menuWrapStyle = useMemo(() => {
    const next = {};
    if (C.menuBg) next.backgroundColor = C.menuBg;
    return next;
  }, [C]);

  // 항목 스타일 (hover 반영)
  const itemStyle = (idx) => {
    const next = {};
    if (C.itemFg) next.color = C.itemFg;
    if (hoverIdx === idx) {
      if (C.itemHoverBg) next.backgroundColor = C.itemHoverBg;
      if (C.itemHoverFg) next.color = C.itemHoverFg;
    }
    return next;
  };

  return (
    <S.DropContainer>
      <S.ButtonWrap ref={ref}>
        <S.DropDownButton
          as={NoDomSelectButton}
          type="button"
          onClick={handler}
          selected={!!selected}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={buttonStyle}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          {labelOf(selected)}
          <S.DropDownIconWrap>
            <S.DropDownIcon />
          </S.DropDownIconWrap>
        </S.DropDownButton>

        <S.DropDownMenuWrap
          as={NoDomDroppedDiv}
          $isDropped={open}
          role="listbox"
          style={menuWrapStyle}
        >
          {ITEMS.map((it, idx) => (
            <S.DropDownMenu
              key={it.value}
              role="option"
              aria-selected={selected === it.value}
              onClick={() => select(it.value)}
              style={itemStyle(idx)}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(-1)}
            >
              {it.label}
            </S.DropDownMenu>
          ))}
        </S.DropDownMenuWrap>
      </S.ButtonWrap>
    </S.DropContainer>
  );
};

export default ThreeDropDown;
