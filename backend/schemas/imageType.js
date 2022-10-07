export default {
  name: "imageType",
  title: "Image Type",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
    },
    // prepare(selection) {
    //   const { author } = selection;
    //   return Object.assign({}, selection, {
    //     subtitle: author && `by ${author}`,
    //   });
    // },
  },
};
