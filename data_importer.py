#json 파일에서 티켓에 대한 tags를 배열로 추출하는 코드
import json

with open('./SAMPLE.json') as f:
    data = json.load(f)

tags = data['tags']
print(tags)
