import { Box, Typography } from "@mui/material";
import { IProductCreateSchema, IVariantItem } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";
import { DynamicInputArray } from "../../../../components/common/text-field/list-text-field";
import { useValidation } from "../../../../context/validate";
import SingleImageUploader from "../../../../components/common/image-upload";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import { useEffect, useState } from "react";
import { CommonBooleanCheckboxVer2 } from "../../../../components/common/check-box/check-box-boolean-ver2";

export const Variant = () => {
  const { formData, setFieldValue } = useValidation<IProductCreateSchema>();
  const variants = formData.productVariants ?? [];
  const handleUpdate = (
    index: number,
    field: keyof IVariantItem,
    value: any
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setFieldValue("productVariants", updated);
  };
  const [generatedVariants, setGeneratedVariants] = useState<IVariantItem[]>(
    []
  );

  const propertyValue1 = formData.propertyValue1 ?? [];
  const propertyValue2 = formData.propertyValue2 ?? [];
  console.log(propertyValue1);

  useEffect(() => {
    if (propertyValue1.length > 0 && propertyValue2.length > 0) {
      const newVariants: IVariantItem[] = [];

      for (const val1 of propertyValue1) {
        for (const val2 of propertyValue2) {
          newVariants.push({
            propertyValue1: val1,
            propertyValue2: val2,
            price: 0,
            stock: 0,
            isActivate: true,
            image: "",
          });
        }
      }

      setGeneratedVariants(newVariants);
    }
  }, [propertyValue1, propertyValue2]);

  useEffect(() => {
    if (generatedVariants.length > 0) {
      const merged = generatedVariants.map((gen) => {
        const old = variants.find(
          (v) =>
            v.propertyValue1 === gen.propertyValue1 &&
            v.propertyValue2 === gen.propertyValue2
        );
        return old ? { ...gen, ...old } : gen;
      });

      const isDifferent = JSON.stringify(variants) !== JSON.stringify(merged);
      if (isDifferent) {
        setFieldValue("productVariants", merged);
      }
    }
  }, [generatedVariants]);

  return (
    <CommonCart title="Biến thể">
      <Box
        sx={{
          border: "1px solid #c5c2c2",
          p: "15px 25px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <CommonTextField<IProductCreateSchema>
          name="propertyName1"
          label="Thuộc tính"
        />
        <DynamicInputArray label={"Giá trị"} name="propertyValue1" />
      </Box>
      <Box
        sx={{
          border: "1px solid #c5c2c2",
          p: "15px 25px",
          borderRadius: "10px",
        }}
      >
        <CommonTextField<IProductCreateSchema>
          name="propertyName2"
          label="Thuộc tính"
        />
        <DynamicInputArray label={"Giá trị"} name="propertyValue2" />
      </Box>
      <Box>
        <Box
          className="table-head"
          sx={{
            p: 2,
            backgroundColor: "#ece8e8",
            borderRadius: "5px",
            marginTop: "10px",
            display: "flex",
            gap: 1,
          }}
        >
          <Box className="table-cell" sx={{ flex: 1 }}></Box>
          <Box className="table-cell" sx={{ flex: 2 }}>
            Thuộc tính
          </Box>
          <Box className="table-cell" sx={{ flex: 2 }}>
            Giá trị
          </Box>
          <Box className="table-cell" sx={{ flex: 2 }}>
            Giá
          </Box>
          <Box className="table-cell" sx={{ flex: 2 }}>
            Kho
          </Box>
          <Box className="table-cell" sx={{ flex: 1 }}></Box>
        </Box>
        <Box
          className="table-body"
          sx={{
            p: 2,
          }}
        >
          {variants.map((variant, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <SingleImageUploader
                  size={40}
                  initialImage={variant.image}
                  onChange={(file) => handleUpdate(index, "image", file)}
                />
              </Box>
              <Box sx={{ flex: 2 }}>
                <Typography>{variant.propertyValue1}</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <Typography>{variant.propertyValue2}</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <CommonTextFieldVer2
                  value={String(variant.price)}
                  onChange={(val) => handleUpdate(index, "price", Number(val))}
                  type="number"
                  label={undefined}
                />
              </Box>
              <Box sx={{ flex: 2 }}>
                <CommonTextFieldVer2
                  value={String(variant.stock)}
                  onChange={(val) => handleUpdate(index, "stock", Number(val))}
                  type="number"
                  label={undefined}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <CommonBooleanCheckboxVer2
                  label=""
                  value={variant.isActivate}
                  onChange={(value) => handleUpdate(index, "isActivate", value)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </CommonCart>
  );
};
