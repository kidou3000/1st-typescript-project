import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  // ここで画像や音を読み込む
}

function create() {
  // ここで画面にオブジェクトを配置する
}

function update() {
  // ここでゲームロジックを書く
}
