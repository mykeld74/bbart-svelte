import React, { useEffect, useState } from "react";
import { Card, Flex, Checkbox, Box, Text } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import { useId } from "@reach/auto-id";
import client from "../lib/client";

const ImageTypesSelect = React.forwardRef((props, ref) => {
  const [imageTypes, setImageTypes] = useState([]);

  useEffect(() => {
    const fetchImageTypes = async () => {
      await client
        .fetch(
          `*[_type == 'imageType'] | order(order asc) {
          _id,
          title
        }`
        )
        .then(setImageTypes);
    };

    fetchImageTypes();
  }, []);

  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events,
  } = props;

  const handleClick = React.useCallback(
    (e) => {
      const inputValue = {
        _key: e.target.value.slice(0, 10),
        _type: "reference",
        _ref: e.target.value,
      };

      if (value) {
        if (value.some((imageType) => imageType._ref === inputValue._ref)) {
          onChange(
            PatchEvent.from(
              set(value.filter((item) => item._ref != inputValue._ref))
            )
          );
        } else {
          onChange(PatchEvent.from(set([...value, inputValue])));
        }
      } else {
        onChange(PatchEvent.from(set([inputValue])));
      }
    },
    [value]
  );

  const inputId = useId();

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
      inputId={inputId} // Allows the label to connect to the input field
      readOnly={readOnly}
    >
      {imageTypes.map((imageType) => (
        <Card padding={2}>
          <Flex align="center">
            <Checkbox
              id="checkbox"
              style={{ display: "block" }}
              onClick={handleClick}
              value={imageType._id}
              checked={
                value
                  ? value.some((item) => item._ref === imageType._id)
                  : false
              }
            />
            <Box flex={1} paddingLeft={3}>
              <Text>
                <label htmlFor="checkbox">{imageType.title}</label>
              </Text>
            </Box>
          </Flex>
        </Card>
      ))}
    </FormField>
  );
});

export default ImageTypesSelect;
