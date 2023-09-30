import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [tema, setTema] = useState('');
  const [titulos, setTitulos] = useState([]);

  const procurarLivros = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/subjects/${tema}.json`);
      const works = response.data.works;
      const titles = works.map((work) => work.title);
      setTitulos(titles);
    } 
    catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "lightpink" }}>
      <Text style={{ borderTopWidth: 50, borderTopColor: "lightpink", fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>FIND BOOKS WITH YOUR SUBJECT:</Text>
      <Text style={{ borderTopWidth: 50, borderTopColor: "lightpink", fontSize: 20, fontWeight: "bold" }}>Subject Name:</Text>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setTema(text)}
        value={tema}
      />
      <Button title="Find Books" onPress={procurarLivros} />
      <FlatList
        data={titulos}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Turma: 513</Text>
      <Text style={{borderBottomWidth: 50, borderBottomColor: "lightpink", fontSize: 20, fontWeight: "bold"}}>Alunas: Ana Clara Medeiros da Silva e Maria Clara Silva de Menezes</Text>
    </View>
  );
}
