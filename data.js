const nodes = [
    {
        "id": "1",
        "title": "Blackfin",
        "description": "IFX-49",
        "children": [
            "2",
            "31"
        ],
        "level": 0
    },
    {
        "id": "2",
        "title": "バイパス",
        "description": "入力音をそのまま出力する",
        "children": [
            "3",
            "5",
            "13",
            "15",
            "22",
            "24"
        ],
        "level": 1
    },
    {
        "id": "3",
        "title": "定数倍",
        "description": "（USERボタンを押したとき）入力音の音量を定数倍して出力する",
        "children": [
            "4",
            "33"
        ],
        "level": 2
    },
    {
        "id": "4",
        "title": "加算合成",
        "description": "入力音と何か別の音を足し算する",
        "children": [
            "54"
        ],
        "level": 3
    },
    {
        "id": "5",
        "title": "オシレータ",
        "description": "波形を生成する",
        "children": [
            "6",
            "7",
            "8"
        ],
        "level": 2
    },
    {
        "id": "6",
        "title": "正弦波",
        "description": "正弦波をsinf()でつど生成し出力する",
        "children": [
            "10"
        ],
        "level": 3
    },
    {
        "id": "7",
        "title": "波形テーブル",
        "description": "正弦波をsinf()で計算しておき出力する",
        "children": [
            "4",
            "9"
        ],
        "level": 3
    },
    {
        "id": "8",
        "title": "ランダムノイズ",
        "description": "乱数を生成し白色ノイズのような波形を出力する",
        "children": [],
        "level": 3
    },
    {
        "id": "9",
        "title": "*PCM再生",
        "description": "wavファイルを持ってきて再生したい",
        "children": [],
        "level": 3
    },
    {
        "id": "10",
        "title": "AM変調",
        "description": "入力音と正弦波を掛け算する。トレモロ～リングモジュレーション",
        "children": [
            "11"
        ],
        "level": 4
    },
    {
        "id": "11",
        "title": "FM変調",
        "description": "入力音の読み出し位置を正弦波で遅延させる。ビブラート",
        "children": [
            "12"
        ],
        "level": 4
    },
    {
        "id": "12",
        "title": "コーラス",
        "description": "ビブラートに原音を混ぜる",
        "children": [],
        "level": 4
    },
    {
        "id": "13",
        "title": "ダイナミクス",
        "description": "入力音の音量をもとに制御する",
        "children": [
            "14"
        ],
        "level": 2
    },
    {
        "id": "14",
        "title": "ゲート",
        "description": "入力音が閾値以下のとき音量を0にする。ピーノイズがひどいため作った",
        "children": [
            "34"
        ],
        "level": 2
    },
    {
        "id": "15",
        "title": "フィルタ",
        "description": "入力音の周波数を制御する",
        "children": [
            "16"
        ],
        "level": 2
    },
    {
        "id": "16",
        "title": "移動平均フィルタ",
        "description": "ローパスフィルタになった。SMA (Simple Moving Average)",
        "children": [
            "17"
        ],
        "level": 3
    },
    {
        "id": "17",
        "title": "FIRフィルタ",
        "description": "Fir_remezで生成したフィルタ係数を使う。55個ぶん遡って足し合わせた結果を出力",
        "children": [
            "18"
        ],
        "level": 3
    },
    {
        "id": "18",
        "title": "IIRフィルタ",
        "description": "縦続型を使った。24bit固定小数点の扱いでツボった",
        "children": [
            "19"
        ],
        "level": 3
    },
    {
        "id": "19",
        "title": "ピークフィルタ",
        "description": "αβγの計算が難しそう",
        "children": [
            "20"
        ],
        "level": 3
    },
    {
        "id": "20",
        "title": "状態変数フィルタ",
        "description": "ツマミでcutoff周波数を設定。ロータリーエンコーダで4種のフィルタを切替",
        "children": [
            "21"
        ],
        "level": 3
    },
    {
        "id": "21",
        "title": "3バンドEQ",
        "description": "3つのIIRフィルタを重ね掛け。3つのツマミで各帯域の音量を調整する",
        "children": [
            "28"
        ],
        "level": 4
    },
    {
        "id": "22",
        "title": "ディレイ",
        "description": "19.2kバイトメモリをフルで使って最長ディレイ250ms",
        "children": [
            "23"
        ],
        "level": 2
    },
    {
        "id": "23",
        "title": "リバーブ",
        "description": "短いディレイを重ね掛け",
        "children": [
            "27"
        ],
        "level": 3
    },
    {
        "id": "24",
        "title": "タップテンポ",
        "description": "ボタンを4回,16回押した平均BPMを表示する",
        "children": [
            "25"
        ],
        "level": 2
    },
    {
        "id": "25",
        "title": "チューナー",
        "description": "入力音の周波数をゼロクロスで測定し表示。もっと安定する方法があるらしい",
        "children": [],
        "level": 2
    },
    {
        "id": "26",
        "title": "*ピッチシフタ",
        "description": "再生速度を変えずに音程を変える",
        "children": [],
        "level": 4
    },
    {
        "id": "27",
        "title": "*逆再生",
        "description": "チャンク逆再生、リバースディレイ、リバースリバーブ、テープストップやりたい",
        "children": [],
        "level": 3
    },
    {
        "id": "28",
        "title": "7バンドEQ",
        "description": "8本のスライドボリュームを7バンド+マスターボリュームとする",
        "children": [
            "47"
        ],
        "level": 4
    },
    {
        "id": "31",
        "title": "拡張ボード",
        "description": "MADSP-BF592-BASE",
        "children": [
            "32",
            "35",
            "41",
            "52"
        ],
        "level": 1
    },
    {
        "id": "32",
        "title": "ロータリボリューム",
        "description": "4つの可変抵抗",
        "children": [
            "33",
            "38",
            "39",
            "21"
        ],
        "level": 2
    },
    {
        "id": "33",
        "title": "定数倍",
        "description": "ロータリボリューム値0～255を読み取り、音量を0～2倍にする",
        "children": [
            "34"
        ],
        "level": 3
    },
    {
        "id": "34",
        "title": "ゲート",
        "description": "ロータリボリュームで閾値を制御する",
        "children": [],
        "level": 3
    },
    {
        "id": "35",
        "title": "LCD",
        "description": "16×2キャラクタLCDははじめてさわった。XK-5についてる",
        "children": [
            "36"
        ],
        "level": 2
    },
    {
        "id": "36",
        "title": "文字表示",
        "description": "ABCDEを表示したり、座標を指定する",
        "children": [
            "37"
        ],
        "level": 3
    },
    {
        "id": "37",
        "title": "時計",
        "description": "1秒ごとにインクリメントしLCDを更新する。コンパイル時刻からしか始められない",
        "children": [
            "38"
        ],
        "level": 3
    },
    {
        "id": "38",
        "title": "ツマミ値表示",
        "description": "4つのロータリボリューム連動してLCDに値を表示する",
        "children": [],
        "level": 3
    },
    {
        "id": "39",
        "title": "ロータリエンコーダ",
        "description": "状態変数フィルタの切替に使った。無限に回るしプッシュもできる",
        "children": [
            "40",
            "20"
        ],
        "level": 2
    },
    {
        "id": "40",
        "title": "スライドボリューム",
        "description": "8つあり、ロータリボリュームと扱いが同じ",
        "children": [
            "54",
            "28"
        ],
        "level": 2
    },
    {
        "id": "41",
        "title": "UART通信",
        "description": "変換ICのCP2114専用ライブラリの扱いが難しくツボった",
        "children": [
            "42",
            "43"
        ],
        "level": 2
    },
    {
        "id": "42",
        "title": "受信バイトカウンタ",
        "description": "Blackfinが何バイト受信したかを確認する。",
        "children": [
            "43"
        ],
        "level": 3
    },
    {
        "id": "43",
        "title": "GUIアプリ",
        "description": "サンプルを編集できなかったためPython（tkinter）でイチから作った",
        "children": [
            "44",
            "50",
            "53"
        ],
        "level": 2
    },
    {
        "id": "44",
        "title": "スライダ倍",
        "description": "tkinterの基本のスライダで0～255値を送信し音量を0～2倍にする",
        "children": [
            "45"
        ],
        "level": 3
    },
    {
        "id": "45",
        "title": "ノブ倍",
        "description": "VSTプラグインによくある回転するノブで値を送信する",
        "children": [
            "46"
        ],
        "level": 3
    },
    {
        "id": "46",
        "title": "状態変数フィルタ",
        "description": "グラフをドラッグしcutoff周波数を設定しラジオボタンで4種のフィルタを変更する",
        "children": [
            "47"
        ],
        "level": 4
    },
    {
        "id": "47",
        "title": "31バンドEQ",
        "description": "サンプルを再現した。表示や操作感を改善した",
        "children": [
            "48"
        ],
        "level": 4
    },
    {
        "id": "48",
        "title": "フォルマントフィルタ",
        "description": "2つのバンドパスフィルタの周波数をマウスのxy座標で設定する。背景に画像を読み込む",
        "children": [
            "49",
            "51"
        ],
        "level": 4
    },
    {
        "id": "49",
        "title": "*フォルマントシフタ",
        "description": "フォルマント関連でやりたい",
        "children": [
            "26"
        ],
        "level": 4
    },
    {
        "id": "50",
        "title": "customtkinter",
        "description": "モダンなtkinterを導入",
        "children": [],
        "level": 2
    },
    {
        "id": "51",
        "title": "マルチエフェクタ",
        "description": "サンプルを再現した。表示や操作感を改善した",
        "children": [
            "54"
        ],
        "level": 4
    },
    {
        "id": "52",
        "title": "*SDカード",
        "description": "本誌に説明が何もない",
        "children": [],
        "level": 2
    },
    {
        "id": "53",
        "title": "*GUI同期",
        "description": "拡張ボードの操作をGUIアプリに反映させたい",
        "children": [],
        "level": 3
    },
    {
        "id": "54",
        "title": "8スライダドローバー",
        "description": "本来9本だが、8本のスライドボリュームで基音440Hzの倍音列を加算合成する",
        "children": [
            "55",
            "56"
        ],
        "level": 4
    },
    {
        "id": "55",
        "title": "CGRAM文字作成",
        "description": "clcd.cに8文字分登録できる。横5×縦1～8ピクセルの長方形を登録した",
        "children": [
            "56"
        ],
        "level": 5
    },
    {
        "id": "56",
        "title": "14スライダドローバー",
        "description": "本来9本だが、きれいに1バイト命令で送信できる14個の倍音列を加算合成する",
        "children": [
            "57",
            "58"
        ],
        "level": 4
    },
    {
        "id": "57",
        "title": "QWERTYキーボード",
        "description": "キーボード入力で基音を決め、キーON,OFF情報を送信する",
        "children": [],
        "level": 5
    },
    {
        "id": "58",
        "title": "*オムニコード",
        "description": "キーボード入力で和音を決める",
        "children": [
            "59"
        ],
        "level": 4
    },
    {
        "id": "59",
        "title": "*レスリーエフェクト",
        "description": "ビブラートコーラスとどう違うの",
        "children": [],
        "level": 4
    },
    {
        "id": "60",
        "title": "*LLM統合",
        "description": "未来のエフェクターにはAIが入っている",
        "children": [],
        "level": 5
    },
    {
        "id": "61",
        "title": "*3Dプリント",
        "description": "3Dプリンタ使ったことないけどケースやノブをつくりたい",
        "children": [],
        "level": 5
    }
];
