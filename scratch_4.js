const candidateSet = [];
const combSet = new Set();
function solution(relation) {
    let answer = 0;

    for(let i = 1; i< Math.pow(2, relation[0].length); i++){ // 비트마스크를 이용한 조합 생성
        if(!checkCandidate(i, relation)) continue; // 유일성을 만족하지 않는 경우
        if(checkSubSet(i)) continue; // 최소성을 만족하지 않는 경우
        candidateSet.push(i);
    }
    answer = candidateSet.length;
    return answer;
}

const checkCandidate = (key, relation) => {
    const checkSet = new Set();
    for(let i = 0; i<relation.length; i++){
        let keyStr = "";
        for(let j=0; j<relation[0].length; j++){
            if(key&1<<j) keyStr+=relation[i][j]; // 비트마스크를 이용해 해당하는 키 값 가져오기
        }
        if(checkSet.has(keyStr)) {
            return false;
        }
        checkSet.add(keyStr);
    }
    return true;
}

const checkSubSet = (key) => {
    for(let candidate of candidateSet){
        if((key&candidate)===candidate) return true; // 비트마스크를 이용한 부분집합 판단
    }
    return false;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))