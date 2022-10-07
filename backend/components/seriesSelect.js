import React, { useEffect, useState } from "react";
import { Card, Flex, Checkbox, Box, Text } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import { useId } from "@reach/auto-id";
import client from "../lib/client";

const SeriesSelect = React.forwardRef((props, ref) => {
  const [allSeries, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      await client
        .fetch(
          `*[_type == 'series'] | order(order asc) {
          _id,
          title
        }`
        )
        .then(setSeries);
    };

    fetchSeries();
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
        if (value.some((series) => series._ref === inputValue._ref)) {
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
      {allSeries.map((series) => (
        <Card padding={2}>
          <Flex align="center">
            <Checkbox
              id="checkbox"
              style={{ display: "block" }}
              onClick={handleClick}
              value={series._id}
              checked={
                value ? value.some((item) => item._ref === series._id) : false
              }
            />
            <Box flex={1} paddingLeft={3}>
              <Text>
                <label htmlFor="checkbox">{series.title}</label>
              </Text>
            </Box>
          </Flex>
        </Card>
      ))}
    </FormField>
  );
});

export default SeriesSelect;
