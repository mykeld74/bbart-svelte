import SeriesSelect from "../components/seriesSelect";
import ImageTypeSelect from "../components/imageTypeSelect";

export default {
  name: "artwork",
  title: "Artwork",
  type: "document",
  initialValue: {
    sold: false,
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "size",
      title: "Size",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "series",
      title: "Series",
      type: "array",
      of: [{ type: "reference", to: { type: "series" } }],
      inputComponent: SeriesSelect,
    },
    {
      name: "imgTypes",
      title: "Image Types",
      type: "array",
      of: [{ type: "reference", to: { type: "imageType" } }],
      inputComponent: ImageTypeSelect,
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "sold",
      title: "Sold",
      type: "boolean",
    },
    {
      name: "originalDescription",
      title: "Original Description",
      type: "blockContent",
    },
    {
      name: "printsDescription",
      title: "Prints Description",
      type: "blockContent",
    },
    {
      name: "commissionDescription",
      title: "Commission Description",
      type: "blockContent",
    },

    {
      name: "etsyLink",
      title: "Etsy Link",
      type: "url",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],

  initialValue: {
    sold: false,
  },

  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    // prepare(selection) {
    //   const { author } = selection;
    //   return Object.assign({}, selection, {
    //     subtitle: author && `by ${author}`,
    //   });
    // },
  },
};
