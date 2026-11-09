# Resume Screener Assistant 🤖

An AI-powered resume screening platform that helps HR teams evaluate candidates against job descriptions using Google Gemini AI. It analyzes candidate skills, identifies skill gaps, calculates a match score, and generates relevant interview questions.

## 🚀 Overview

Resume Screener Assistant simplifies the initial recruitment screening process by comparing candidate resumes with job requirements and generating structured evaluation reports.

HR teams can analyze candidates, review AI-generated insights, and access previously saved screening reports through a centralized dashboard.

## ✨ Features

- **AI Resume Analysis:** Analyze resumes against job descriptions using Google Gemini.
- **Match Score:** Generate a candidate-job compatibility score from 0–100.
- **Matching Skills:** Identify up to 5 relevant skills from the candidate's resume.
- **Skill Gap Analysis:** Identify up to 3 missing or weaker skills.
- **Interview Questions:** Generate 3 relevant technical or role-based interview questions.
- **Candidate Management:** Store candidate names and email addresses.
- **Analysis History:** Save and review previous screening reports.
- **Search & Filters:** Search candidates by name or email and filter by match score.
- **Detailed Reports:** View individual candidate reports, resumes, and job descriptions.
- **Dashboard Analytics:** Monitor total analyses, average match score, and strong matches.
- **Input Validation:** Validate user inputs and AI-generated JSON using Zod.
- **Error Handling:** Handle invalid inputs, AI failures, and database errors.

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Next.js API Routes |
| AI Integration | Google Gemini API |
| Database | Neon PostgreSQL |
| ORM | Prisma 6 |
| Validation | Zod |
| Deployment | Vercel |
| Version Control | Git & GitHub |

## 🏗️ Architecture

```text
                    HR / Recruiter
                          |
                          v
                  Next.js Web App
                          |
                          v
                   API Routes
                          |
              +-----------+-----------+
              |                       |
              v                       v
         Gemini API              Prisma ORM
              |                       |
              v                       v
       Structured JSON          Neon PostgreSQL
              |                       |
              +-----------+-----------+
                          |
                          v
                  Screening Report
```

## 📁 Project Structure

```text
resume-screener-assistant/
│
├── app/
│   ├── api/
│   │   └── analysis/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── analyzer/
│   │   └── page.tsx
│   │
│   ├── analysis/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   └── history/
│       └── page.tsx
│
├── components/
│   ├── analyzer/
│   ├── dashboard/
│   ├── history/
│   └── layout/
│
├── lib/
│   ├── prisma.ts
│   ├── constants.ts
│   ├── utils.ts
│   └── openai.ts
│
├── prisma/
│   └── schema.prisma
│
├── schemas/
│   └── analysis.schema.ts
│
├── services/
│   └── analysis.service.ts
│
├── types/
│   └── analysis.types.ts
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bit-tech001/-Resume-Screener-Assistant-.git

cd -Resume-Screener-Assistant-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="YOUR_NEON_POSTGRESQL_CONNECTION_STRING"

GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

GEMINI_MODEL="YOUR_WORKING_GEMINI_MODEL"
```

Never commit your `.env` file or expose API credentials in frontend code.

### 4. Configure Prisma

Generate the Prisma Client:

```bash
npx prisma generate
```

Synchronize the database schema:

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🗄️ Database Design

The application uses PostgreSQL with Prisma ORM.

### Analysis Model

| Field | Type | Description |
|---|---|---|
| id | String | Unique analysis ID |
| candidateName | String | Candidate name |
| candidateEmail | String? | Candidate email |
| jobDescription | String | Job description |
| resumeText | String | Candidate resume |
| matchScore | Int | AI match score |
| matchingSkills | JSON | Matching skills |
| skillGaps | JSON | Identified skill gaps |
| interviewQuestions | JSON | Generated questions |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

## 🔌 API Endpoints

### Create Resume Analysis

`POST /api/analysis`

Example request:

```json
{
  "candidateName": "Rahul Sharma",
  "candidateEmail": "rahul@example.com",
  "jobDescription": "Looking for a Full Stack Developer...",
  "resumeText": "Experienced developer with React and Node.js..."
}
```

### Get Analysis History

`GET /api/analysis`

Optional query parameters:

- `search`
- `minScore`
- `maxScore`

Example:

```text
/api/analysis?search=Rahul&minScore=70&maxScore=100
```

### Get Individual Analysis

`GET /api/analysis/:id`

Returns the saved candidate analysis using its unique ID.

## 🧠 AI Prompting & Output Validation

The application uses Google Gemini to compare candidate information with job requirements.

The AI is instructed to return structured JSON containing:

```json
{
  "matchScore": 85,
  "matchingSkills": [
    "React.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "REST APIs"
  ],
  "skillGaps": [
    "Docker",
    "AWS"
  ],
  "interviewQuestions": [
    "How does React manage component state?",
    "Explain middleware in Express.js.",
    "How would you optimize a PostgreSQL query?"
  ]
}
```

The response is parsed and validated using Zod before it is saved to the database or displayed in the UI.

The output is intended to support human review, not make final hiring decisions.

## 🛡️ Error Handling & Privacy

- Validate candidate information before AI processing.
- Reject empty or excessively long inputs.
- Validate AI-generated JSON before saving.
- Handle AI API and database failures with meaningful error responses.
- Keep API keys in server-side environment variables.
- Avoid exposing candidate information in client-side logs.
- Store candidate resumes and job descriptions in PostgreSQL for report history.

**Privacy note:** Candidate information is stored in the configured database. Deployers should establish an appropriate retention and deletion policy, restrict access to candidate records, and inform candidates about how their data is processed. Do not submit sensitive personal information unnecessarily.

## 🚀 Deployment

### GitHub

Push the project to your GitHub repository.

### Vercel

1. Import the GitHub repository into Vercel.
2. Configure the production environment variables.
3. Deploy the Next.js application.
4. Verify the deployed application and API routes.

### Neon PostgreSQL

1. Create or select a Neon project.
2. Configure the PostgreSQL connection string.
3. Apply the Prisma schema to the production database.
4. Verify that production analyses are saved successfully.

## 🧪 Testing Checklist

- [ ] Dashboard loads successfully.
- [ ] Candidate details can be submitted.
- [ ] Resume analysis works with Gemini.
- [ ] Match score is between 0 and 100.
- [ ] Matching skills are generated.
- [ ] Skill gaps are identified.
- [ ] Exactly 3 interview questions are generated.
- [ ] AI output passes Zod validation.
- [ ] Analysis is saved in PostgreSQL.
- [ ] History displays saved records.
- [ ] Search and score filters work.
- [ ] Individual reports open correctly.
- [ ] Invalid inputs display useful errors.
- [ ] Production deployment works.

## 🔮 Future Improvements

- PDF and DOCX resume uploads.
- Bulk resume screening.
- Candidate comparison.
- Export screening reports to PDF.
- Authentication and role-based HR access.
- Candidate data deletion and retention controls.
- Advanced recruitment analytics.
- Customizable job-specific evaluation criteria.

## 👨‍💻 Author

**Bitu Pathakk**

GitHub: [@bit-tech001](https://github.com/bit-tech001)

---

## 📄 License

This project is developed as a resume screening and recruitment assistance application. Add a formal open-source license before permitting third-party redistribution or reuse.
