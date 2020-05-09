# Setup

Dockerコンテナの中にインストールする。

Pulsarのインストール方法は [Run Pulsar locally](https://pulsar.apache.org/docs/en/standalone/) にある。

## 実行

### サーバ側の起動

```.sh
docker run -it --name pulsar-server walk8243/apache-pulsar:latest
```

### クライアント側の起動

クライアント側は **コンシューマ** と **プロデューサ** の2つを起動します。

```.sh
// コンシューマ
docker run -it --name pulsar-consumer --link pulsar-server:pulsar-server walk8243/apache-pulsar:latest /bin/bash

// プロデューサ
docker run -it --name pulsar-producer --link pulsar-server:pulsar-server walk8243/apache-pulsar:latest /bin/bash
```

### コンシューマを待ち受け状態にする

```.sh
// docker exec -it pulsar-consumer /bin/bash
bin/pulsar-client --url pulsar://pulsar-server:6650 consume my-topic -s "sample-subscription"
```

[コンシューマのコマンドの使い方](https://pulsar.apache.org/docs/en/reference-cli-tools/#consume)

### プロデューサからメッセージを投げる

```.sh
// docker exec -it pulsar-producer /bin/bash
bin/pulsar-client --url pulsar://pulsar-server:6650 produce my-topic --messages "hello-pulsar"
```

[プロデューサのコマンドの使い方](https://pulsar.apache.org/docs/en/reference-cli-tools/#produce)

これで、コンシューマ側で以下のようなログが表示され、Pulsar経由でメッセージを受け取れたことが確認できる。

```.log
----- got message -----
hello-pulsar
```
