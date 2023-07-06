export default function FormValidation() {
    let error = false
    // 各入力項目の取得
    const name      = document.querySelector("input[name='username']")
    const age       = document.querySelector("input[name='age']")
    const rating    = document.querySelector("select[name='rating']")
    const reason    = document.querySelector("textarea[name='reason']")
    // エラー出力位置の取得
    const nameError     = document.querySelector("#nameError")
    const ageError      = document.querySelector("#ageError")
    const ratingError   = document.querySelector("#ratingError")
    const reasonError   = document.querySelector("#reasonError")
    // エラーの初期化
    nameError.innerHTML     = ""
    ageError.innerHTML      = ""
    ratingError.innerHTML   = ""
    reasonError.innerHTML   = ""

    // 名前は記号の入力は受け付けない
    const nameVal = /^[0-9０-９!?_+*'"`#$%&\-^\\@;:,./=~|[\](){}<>！？＿＋＊’”‘＃＄％＆￥－＾￥＠；：，．／＝～｜［］（）｛｝＜＞]+$/;
    if(name.value.match(nameVal) || name.value === "") {
        nameError.innerHTML = "名前を入力してください"
        error = true
    }
    // 年齢は数字の入力のみ3桁まで
    const ageVal = /^[0-9]{1,3}$/;
    // 一応120以上は年齢と見なさないようにする
    if(!age.value.match(ageVal) || Number(age.value) >= 120 || age.value === "") {
        ageError.innerHTML = "年齢を入力してください"
        error = true
    }
    // 評価が選択されているかチェック
    for(const option of rating.options) {
        if(option.selected) {
            if(option.value === "") {
                ratingError.innerHTML = "評価を選択してください"
                error = true
            }
        }
    }
    // レビュー内容が入力されているかチェック
    if(reason.value === "") {
        reasonError.innerHTML = "レビューの内容を入力してください"
        error = true
    }
    // エラーが1つでもある場合はサーバー送信しない
    if(error) event.preventDefault()
}
