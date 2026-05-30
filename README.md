Task Manager Application
אפליקציית ניהול משימות מתקדמת שנבנתה ב-Vue 3 בשילוב Vuetify ו-Pinia. האפליקציה מאפשרת למשתמשים לנהל את המטלות היומיות שלהם בצורה נוחה, מסודרת ומאורגנת לפי קטגוריות.

תכונות עיקריות
ניהול משימות: הוספה, מחיקה ועדכון סטטוס משימות.

קטגוריות: ארגון משימות תחת קטגוריות מוגדרות (עבודה, אישי, קניות, לימודים, בית).

חיפוש וסינון: חיפוש דינמי לפי שם המשימה וסינון משימות לפי קטגוריה.

ממשק משתמש: עיצוב רספונסיבי ומודרני באמצעות ספריית Vuetify.

ניהול מצב (State Management): שימוש ב-Pinia לניהול ריכוזי של נתוני המשימות.

טכנולוגיות בשימוש
Vue 3 (Composition API)

Vuetify (UI Component Framework)

Pinia (State Management)

Vite (Build Tool)

מבנה הפרויקט
TaskManager.vue: רכיב האב המנהל את הלוגיקה והקשר בין הרכיבים.

TaskInput.vue: טופס להוספת משימה חדשה עם ולידציה.

TaskFilters.vue: רכיב סינון וחיפוש.

TaskTable.vue: טבלה להצגת המשימות מקובצות לפי קטגוריות.

taskStore.js: ה-Store המנהל את הלוגיקה העסקית והנתונים.

התקנה והרצה
שכפול הפרויקט מה-Repository:

Bash
git clone https://github.com/mali8573/task-manager.git
כניסה לתיקיית הפרויקט:

Bash
cd task-manager
התקנת ספריות התלויות:

Bash
npm install
הרצת הפרויקט במצב פיתוח:

Bash
npm run dev
פרויקט זה נכתב בהתאם להנחיות פיתוח ב-Vue 3
