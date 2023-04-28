# Pagination

`Limit` → Número de elementos que deseo traer. Límite de elementos que deseo traer en cada página.

`Offset` → Apuntador, es decir, cuántos elementos quiero escapar.

Ejemplo: Si en una página tengo una lista de elementos `[1, 2, 4, 5, 6]`. Si `limit = 2` y `offset = 0`, el resultado será `[1, 2]`.

Si deseo que en la siguiente página siga trayendo 2 elementos, entonces `limit = 2` y `offset = 2`, solo cambia el apuntador. El resultado será `[3, 4]`.

Si deseo que en la siguiente página siga trayendo 2 elementos, entonces `limit = 2` y `offset = 4`. El resultado será `[5, 6]`.

Se puede implementar `limit` y `offset` de forma nativa, en este caso lo hacemos con el método `models.Product.findAll()`. Cabe mencionar que usualmente vienen por parámetros tipo query y la mayoría de las veces son opcionales.

    async find(queryParams: { limit?: number | null; offset?: number | null }) {
      const { limit, offset } = queryParams;
      const options: any = {
        include: ["category"],
      };

      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      const response: any = await Product.findAll(options);

      if (!response.length) throw boom.notFound("There is not any product yet");

      return response;
    }
