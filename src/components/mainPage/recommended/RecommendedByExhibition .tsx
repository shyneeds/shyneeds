import { LAYOUT } from '../../../constants/layout';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../constants/API_URL';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getExhibitionProductData,
  exhibitionData,
} from '../../../features/main/productSlice';
import { useEffect } from 'react';
import { ResponseType } from '../../../utils/ResponseType';

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
};

export const RecommendedByExhibition = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(exhibitionData);
  const getExhibitionData: any = async () => {
    try {
      const res = await axios.post<ResponseType>(API_URL.POST.MAIN, {
        categoryList: ['기획전상품'],
      });
      const mainData = res.data.data;
      const exhibitionData = mainData.mainCategoryPackageList.기획전상품;
      dispatch(getExhibitionProductData(exhibitionData));
      return exhibitionData;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getExhibitionData();
  }, []);

  return (
    <RecommendedListContainer>
      <RecommendedListTitle>기획전 여행</RecommendedListTitle>
      <CarouselContainer {...settings}>
        {products.map((data: any) => (
          <Link to={'detail/' + data.id} key={data.id}>
            <ProductWrap>
              <img src={data.imageUrl} alt="product_image" />
              <ProductText>
                <Title>{data.title}</Title>
                <Content>{data.summary}</Content>
                <Price>{data.price} 원</Price>
              </ProductText>
              <ProductTag>
                <TagTitle>{data.keyword}</TagTitle>
              </ProductTag>
              <IoMdHeartEmpty size="20px" className="wish-icon" />
            </ProductWrap>
          </Link>
        ))}
      </CarouselContainer>
    </RecommendedListContainer>
  );
};

const RecommendedListContainer = styled.div`
  width: ${LAYOUT.SIZE.WIDTH};
  margin: 80px auto;

  .slick-slider {
    margin: 0 -10px;
  }
  .slick-slide {
    padding: 0 7px;
  }
`;

const RecommendedListTitle = styled.h1`
  margin: 0 0 20px;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -1px;
`;

const CarouselContainer = styled(Slider)`
  .slick-next,
  .slick-prev {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    z-index: 2;
    top: 52%;
  }
  .slick-next::before,
  .slick-prev::before {
    font-size: 0;
  }
  .slick-prev {
    background: url('/icons/ic-chevron-left-40x40-050.svg') no-repeat;
  }
  .slick-next {
    background: url('/icons/ic-chevron-right-40x40-050.svg') no-repeat;
  }
`;

const ProductWrap = styled.div`
  border-radius: 10px;
  border: 1px solid #cccccc;
  overflow: hidden;
  position: relative;

  .wish-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    index: 1;
  }

  > img {
    height: 13rem;
  }
`;

const ProductText = styled.div`
  height: 12rem;
  padding: 22px;
`;

const Title = styled.p`
  margin: 0 0 16px;
  font-size: 1.18rem;
  font-weight: bold;
`;

const Content = styled.p`
  color: #666666;
  height: 4rem;
  font-size: 1rem;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.p`
  margin: 20px 0 0;
  font-size: 1.18rem;
  font-weight: bold;
`;

const ProductTag = styled.div`
  position: absolute;
  top: 10rem;
  right: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagTitle = styled.p`
  font-size: 0.9rem;
`;