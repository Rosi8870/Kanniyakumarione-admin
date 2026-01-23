import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// GET all sponsors
router.get('/', async (req, res) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('sponsors').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ADD sponsor
router.post('/', adminAuth, async (req, res) => {
  try {
    const db = getFirestore();
    const newSponsor = { ...req.body, createdAt: new Date() };
    const docRef = await db.collection('sponsors').add(newSponsor);
    res.status(201).json({ id: docRef.id, ...newSponsor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE sponsor
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const db = getFirestore();
    await db.collection('sponsors').doc(req.params.id).update(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE sponsor
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const db = getFirestore();
    await db.collection('sponsors').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;