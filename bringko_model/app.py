from flask import Flask
from flask import request
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json
app = Flask(__name__)

@app.route("/model/",methods=['GET', 'POST'])
def decision():
    if(request.method == 'POST'):
        # 사용자에게 받은 tags 내용 읽기
        text = request.get_json()['tags']
        # 문장의 문맥을 양방향으로 이해하는 숫자의 형태로 임베딩하는 딥러닝 모델 사용
        model = SentenceTransformer('jhgan/ko-sroberta-multitask')
        # 미리 전처리한 태그별 답변내용 읽기
        df = pd.read_csv('brinko.csv')
        df['embedding'] = df['embedding'].apply(json.loads)
        #사용자에게 받은 tag내용을 bert모델을 사용하여 임베딩
        embedding = model.encode(text)
        #미리 임베딩한 데이터셋에서 사용자가 입력한 문장의 임베딩과 비교를 하여 가장 유사한것을 찾음
        df['distance'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())

        df.head()

        answer = df.loc[df['distance'].idxmax()]
        useranswer = str(answer['챗봇'])
        # 가장 유사한 문장의 답변을 반환
        return useranswer

    
    elif(request.method =='GET'):
        return 'Backend-server Connect'




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
