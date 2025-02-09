# Running the app locally

> Run the postgres locally

```
docker run  -d \
  --name lms-postgress-db \
  -e POSTGRES_USER=shishu \
  -e POSTGRES_PASSWORD=shisu1234 \
  -e POSTGRES_DB=lms \
  -v lms:/var/lib/postgresql/data \
  -p 5433:5432 \
  postgres
```

> Then run the seed command

```
npm run seed

```

```

```

```

```
