import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


const Textes = () => {
    <Document>
        <Page style={styles.body}>
        <Text style={styles.title}>Titre du Document</Text>
        <Text style={styles.text}>Ceci est un exemple de génération de PDF avec react-pdf.</Text>
        </Page>
    </Document>
}

const styles = StyleSheet.create({
    body: { padding: 10 },
    title: { fontSize: 24, marginBottom: 10 },
    text: { fontSize: 12 },
});

const GenererPDF = () => (
    <div>
      <PDFDownloadLink document={<Textes />} fileName="exemple.pdf">
        {({ loading }) => (loading ? 'Chargement du document...' : 'Télécharger le PDF')}
      </PDFDownloadLink>
    </div>
);

export default GenererPDF
