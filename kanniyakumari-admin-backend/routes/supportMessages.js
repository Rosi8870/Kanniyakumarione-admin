import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = getFirestore();
    const messagesRef = db.collection('support_messages');
    const snapshot = await messagesRef.orderBy('createdAt', 'desc').get();

    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching support messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;