# Dockerfile for prover service
FROM rust:1.75 as builder

WORKDIR /app
COPY circuits/ ./circuits/
COPY pdf-utils/ ./pdf-utils/

RUN cd circuits && cargo build --release --bin prover

FROM debian:bookworm-slim
COPY --from=builder /app/circuits/target/release/prover /usr/local/bin/
EXPOSE 3001
CMD ["prover"]
