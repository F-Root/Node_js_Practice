const btn = document.getElementById("list"); //목록으로
const update = document.getElementById("update"); //수정하기
const del = document.getElementById("delete"); //삭제하기

btn.addEventListener("click", () => {
  location.href = "/blog";
});

// 삭제 프로세스
// 글 no를 가져와 정보를 찾야아 할 것.
// 그 찾은 정보를 삭제할 것.
// 목록에서 다시 반영할 것.
// router.delete
//삭제가 완료되었다는 메시지 => 클라이언트에 전달.
// 클라이언트가 특정 동작(경로 이동)을 하도록 설정.

del.addEventListener("click", () => {
  fetch(`http://localhost:3000/blog/delete/${del.dataset.doc}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = data.redirect)) //redirect = "/blog" => 기억 잘해두기
    .catch((err) => {
      console.log(err);
    });
});

// 수정 프로세스
// get으로 기존의 글 값들을 가져오기.
// post전송을 한 후에 수정하는 함수 코드를 활용하여 수정
// PUT 활용X. PATCH를 사용해보자 여기서는  post로 해결...

update.addEventListener("click", () => {
  location.href = `/blog/update/${update.dataset.doc}`;
});
