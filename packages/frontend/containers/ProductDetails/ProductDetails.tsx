import { FC, useCallback, useContext, useMemo, useState } from "react";

import { Col, Row, Typography, Image, Button } from "antd";
import { IProduct, ProductSize } from "@lucy/interfaces";

import { BagContext } from "../../stores";
import { parseProductDescription } from "../../utils";
import { Price, SizePicker } from "../../components";
import * as styles from "./ProductDetails.styles";

export type ProductDetailsProps = {
  product: IProduct;
};

export const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const [size, setSize] = useState<ProductSize>("Medium");
  const { state: bag, dispatch } = useContext(BagContext);

  const addProductToBag = useCallback(() => {
    dispatch({ type: "BAG.ADD_PRODUCT", item: { product, size } });
  }, [dispatch, product, size]);

  const descriptionParagraphs = useMemo(() => {
    return parseProductDescription(product.description);
  }, [product.description]);

  const disableAddToCardButton = useMemo(() => {
    return bag.items.findIndex(item => item.product.id === product.id) !== -1;
  }, [product, bag.items]);

  return (
    <Row className={styles.root}>
      <Col span={24}>
        <Row className={styles.titleRow}>
          <Typography.Title level={1}>{product.name}</Typography.Title>
        </Row>
        <Row className={styles.contentRow} gutter={48}>
          <Col span={12}>
            <div className={styles.description}>
              {descriptionParagraphs.map((paragraph: string, index: number) => (
                <Typography.Paragraph key={index}>{paragraph}</Typography.Paragraph>
              ))}
            </div>
            <div className={styles.actions}>
              <div className={styles.actionsRow}>
                <SizePicker size={size} onChange={setSize} />
              </div>
              <div className={styles.actionsRow}>
                <Button type="primary" onClick={addProductToBag} disabled={disableAddToCardButton}>
                  Add to cart
                </Button>
                <Price className={styles.price} price={product.price} special={product.special} />
              </div>
            </div>
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Image className={styles.image} alt={product.name} src={product.image} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
