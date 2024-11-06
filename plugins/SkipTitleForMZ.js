/*:
 * @target MZ
 * @plugindesc [MZ用] タイトル画面をスキップし、直接ゲームを開始するプラグイン
 * @author pakhuncho
 * @version 1.0.0
 * 
 * @help [RPGツクールMZ専用] タイトル画面スキッププラグイン
 * 
 * ■概要
 * RPGツクールMZ用のプラグインです。
 * タイトル画面をスキップし、直接ゲームを開始することができます。
 * 開発時のテストプレイやデバッグ作業を効率化することができます。
 * 
 * ■特徴
 * ・ゲーム起動時にタイトル画面をスキップ
 * ・直接マップ画面からゲームを開始
 * ・フェードイン・フェードアウト効果を適切に処理
 * 
 * ■使用方法
 * 1. プラグインをプロジェクトの「js/plugins」フォルダに配置
 * 2. プラグイン管理からプラグインを有効化
 * 3. ゲームを起動すると自動的にタイトル画面がスキップされます
 * 
 * ■注意事項
 * ・このプラグインはテストプレイ用途を想定しています
 * ・製品版では必要に応じて無効化することを推奨します
 * ・他のタイトル画面関連のプラグインと競合する可能性があります
 * 
 * ■動作確認環境
 * RPGツクールMZ 1.8.1
 * 
 * ■利用規約
 * ・商用・非商用問わず自由に使用可能
 * ・18禁作品での使用可能
 * ・著作権表示不要
 * ・改変・再配布可能
 * 
 * ■更新履歴
 * ver 1.0.0 (2024/11/06) - 初版リリース
 */

(() => {
    const _Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
    
    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this.fadeInForSkipTitle();
    };

    Scene_Map.prototype.fadeInForSkipTitle = function() {
        if (!$dataSystem.optTransparent) {
            this.startFadeIn(this.fadeSpeed(), false);
        }
    };
})();