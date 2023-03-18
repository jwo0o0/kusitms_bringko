import pandas as pd

# 엑셀 파일 읽기
df = pd.read_excel('data.xlsx')

# 중복된 tag 값을 제거하기 위해 set을 이용하여 고유한 tag 리스트를 만든다.
unique_tags = set()
for tags in df['tag']:
    for tag in tags.split(','):
        unique_tags.add(tag.strip())

# 엑셀 파일 쓰기
writer = pd.ExcelWriter('output.xlsx', engine='xlsxwriter')
df['tag'] = df['tag'].apply(lambda tags: ', '.join(sorted(set(tags.split(',')) & unique_tags)))
df.to_excel(writer, sheet_name='Sheet1', index=False)
writer.save()