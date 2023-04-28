# Filtering

We use `Op.between`, `Op.gte` and `Op.lte` for filtering the data, depending on the query params passed to the request.

    async find(queryParams: IQueryParams) {
      const { limit, offset, price, min_price, max_price } = queryParams;
      const options: any = {
        include: ["category"],
        where: {},
      };

      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      // Price filtering
      if (min_price && max_price) {
        options.where.price = {
          [Op.between]: [min_price, max_price],
        };
      } else if (min_price) {
        options.where.price = {
          [Op.gte]: min_price,
        };
      } else if (max_price) {
        options.where.price = {
          [Op.lte]: max_price,
        };
      } else if (price) {
        options.where.price = price;
      }

      const response: any = await Product.findAll(options);

      if (!response.length) throw boom.notFound("There is not any product yet");

      return response;
    }
