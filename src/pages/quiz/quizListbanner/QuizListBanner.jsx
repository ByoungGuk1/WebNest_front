    import S from './style';

    const QuizListBanner = () => {
        return (
            <S.BannerWrap>
                <S.Banner>
                    <S.BannerInner>
                        <div>
                            <S.PageTitle>훈련장</S.PageTitle>
                            <S.PageDesc>
                                초급부터 최상급까지 다양한 훈련방식 으로 연습하세요!
                            </S.PageDesc>
                        </div>
                        <S.Illust
                            src="/assets/images/chickens.png"
                            alt="문제둥지 일러스트"
                        />
                    </S.BannerInner>
                </S.Banner>
            </S.BannerWrap>
        );
    };

    export default QuizListBanner;