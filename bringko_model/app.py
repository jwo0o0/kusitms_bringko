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
        text = request.get_json()['tags']
        model = SentenceTransformer('jhgan/ko-sroberta-multitask')
        df = pd.read_csv('brinko.csv')
        df['embedding'] = df['embedding'].apply(json.loads)
        embedding = model.encode(text)
        #미리 임베딩한 데이터셋에서 사용자가 입력한 문장의 임베딩과 비교를 하여 가장 유사한것을 찾음
        df['distance'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())

        df.head()

        answer = df.loc[df['distance'].idxmax()]
        useranswer = str(answer['챗봇'])
        return useranswer

    
    elif(request.method =='GET'):
        return 'Backend-server Connect'




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
