import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', adminAuth, async (req, res) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('volunteers').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const db = getFirestore();
    await db.collection('volunteers').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;