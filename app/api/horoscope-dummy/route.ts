import { NextResponse } from "next/server";

type ZodiacSign =
  | "aries" | "taurus" | "gemini" | "cancer" | "leo" | "virgo"
  | "libra" | "scorpio" | "sagittarius" | "capricorn" | "aquarius" | "pisces";

type Prediction = {
  type: string;
  prediction: string;
  challenge: string;
};

type FallbackMap = Record<ZodiacSign, Prediction[]>;


const FALLBACK: FallbackMap = {
  aries: [
    {
      type: "general",
      prediction:
        "Your confidence rises strongly today, making it an excellent time to initiate tasks, take bold steps, and move ahead with plans you were postponing. People may naturally turn to you for direction and leadership, sensing your clarity and fiery determination. You are likely to feel more courageous than usual, willing to tackle even challenging situations head-on. This is a good time to set intentions, outline priorities, and assert yourself in areas where you have been silent. If you channel this energy with maturity, you can make real progress and leave a powerful impression on others.",
      challenge:
        "Temper impulsive reactions, because acting too quickly may create avoidable friction or misunderstandings. Your fiery energy can sometimes make you speak or decide before thinking everything through. Try to pause for a moment before responding to provocation or pressure. If you stay mindful of your tone and timing, you will avoid conflicts and use your strength constructively."
    },
    {
      type: "career",
      prediction:
        "Your proactive approach at work may attract appreciation from seniors, clients, or teammates who notice your initiative. This is a good day for taking charge of pending tasks, clearing backlogs, and setting things in motion that have been stuck. You may feel inspired to propose new ideas or step into a leadership role on a project. Your natural boldness is an asset in negotiations, meetings, and decision-making. If you combine your drive with patience and strategy, you can create lasting professional advantages today.",
      challenge:
        "Avoid rushing major decisions just because you feel pressured or excited in the moment. Double-check key details during discussions, written communication, and agreements so that your confidence does not overlook fine print. Do not let pride stop you from asking clarifying questions where needed. Careful planning will ensure your bold moves pay off instead of backfiring."
    },
    {
      type: "love",
      prediction:
        "Your charm and enthusiasm bring positive energy into relationships, lighting up conversations and time spent together. Partners or potential partners may feel uplifted by your presence and the way you take initiative in expressing affection. This is a good day to plan something fun, playful, or slightly adventurous with your loved one. If you are single, your confident aura can attract meaningful attention and interesting interactions. Being authentic, warm, and straightforward about your feelings will deepen emotional bonds.",
      challenge:
        "Avoid dominating conversations or always wanting things your way, as this may make the other person feel unheard or overshadowed. Allow the other person equal emotional space to share their thoughts, fears, and desires without interruption. Try to listen with patience instead of jumping to quick reactions. A balanced give-and-take will strengthen the connection and keep ego clashes away."
    },
    {
      type: "health",
      prediction:
        "Your stamina remains high and you feel physically energetic, which makes it a good time to engage in fitness or outdoor activities. A morning workout or brisk walk can boost productivity and sharpen your focus for the rest of the day. You may also feel mentally alert, ready to multitask and handle responsibilities efficiently. Using this vitality wisely can help you build better routines and discipline. If you maintain hydration and proper nutrition, your body will support all the ambitions you have today.",
      challenge:
        "Avoid over-exertion just because you feel powerful in the moment, as pushing too hard may cause fatigue or minor strain later. Do not ignore small signals from your body, such as heaviness, tightness, or discomfort. Balance intense activity with rest, stretching, and mindful breathing. If you respect your limits, your energy will stay steady instead of crashing suddenly."
    },
    {
      type: "finance",
      prediction:
        "Finances remain relatively stable today, making it a comfortable time for planning, organizing accounts, and reviewing upcoming expenses. You may experience small gains, thoughtful decisions, or a sense of control over your monetary situation. This is a good time to set short-term financial goals or take the first step toward a larger plan. You might also feel motivated to clear small dues or streamline your budget. Responsible choices now can create more freedom and confidence in the near future.",
      challenge:
        "Avoid impulsive purchases driven by excitement, ego, or a desire to show off your success. Emotional spending may bring temporary joy but can disturb your long-term balance. Think twice before taking sudden financial risks or committing to expenses you have not fully considered. A little discipline will protect the stability you are working hard to build."
    }
  ],

  taurus: [
    {
      type: "general",
      prediction:
        "A calm, steady, and productive day helps you make consistent progress on tasks that require patience and dedication. Your grounded nature allows you to handle even slow-moving responsibilities without frustration. You may prefer a peaceful environment and practical routines that keep you centered. This is a good time to focus on long-term projects, home-related improvements, or self-care. Your reliability stands out, and others may naturally lean on your stability and common sense.",
      challenge:
        "Avoid being too stubborn, especially when situations demand flexibility or adaptation to change. Holding on tightly to old methods or fixed opinions could slow growth or create tension. Try to stay open to feedback and small adjustments in your plans. A gentle willingness to bend without breaking will help you maintain harmony and progress."
    },
    {
      type: "career",
      prediction:
        "Your practical mindset helps you solve issues thoughtfully, especially those involving organization, processes, or long-term planning. Colleagues and superiors may appreciate your reliability and the consistency with which you deliver results. This is a favorable time to complete detailed tasks, review documentation, or refine systems at work. You may feel satisfied by making steady, real-world improvements rather than chasing flashy achievements. Your patient efforts now can lay the foundation for future recognition.",
      challenge:
        "Do not get stuck overthinking minor matters or worrying about small imperfections that do not truly affect the outcome. Excessive caution can delay important decisions or make you resistant to necessary change. Prioritize wisely by focusing on what genuinely matters for progress. Trust that you have the capability to handle things even if every detail is not perfectly controlled."
    },
    {
      type: "love",
      prediction:
        "Warm and grounded emotional exchanges bring you closer to loved ones, as your steady presence creates a sense of comfort and security. You may feel more affectionate in practical ways, such as offering help, listening deeply, or spending quality time together. This is a good day to strengthen bonds through shared routines, meals, or simple pleasures. Your sincerity is deeply valued, and people can sense that your feelings are genuine and dependable. Romance may feel less dramatic but more stable and reassuring.",
      challenge:
        "Avoid emotional rigidity or becoming too fixed in how you think love should appear or be expressed. Be open to small adjustments in expectations, schedules, or communication styles. If you allow some flexibility, you will find that relationships can grow more naturally. Let go of the need to control everything and focus on mutual comfort and understanding."
    },
    {
      type: "health",
      prediction:
        "Steady health supports a balanced routine, allowing you to pace yourself comfortably throughout the day. Light walking, stretching, or gentle exercise will keep you energized without overwhelming your system. You may feel more connected to your body’s natural rhythm, noticing what truly nourishes and restores you. This is a good time to focus on wholesome food, proper rest, and small lifestyle improvements. Consistency in these areas can build a strong foundation for long-term well-being.",
      challenge:
        "Limit sugar, heavy foods, or overeating that may slow digestion and make you feel sluggish. Comfort eating can be tempting, especially when you want emotional security through food. Try to listen to your body’s actual needs rather than cravings alone. Balanced choices will help you feel lighter, more active, and more in control."
    },
    {
      type: "finance",
      prediction:
        "Finances remain stable and predictable, giving you a sense of comfort and security about the near future. This is an excellent day for evaluating your savings, fixed expenses, and long-term financial plans. You may feel inclined to prioritize steady growth over risky ventures. Thoughtful planning now can support goals related to home, family, or material comfort. Small, consistent steps will create more stability than sudden large moves.",
      challenge:
        "Avoid postponing important payments, obligations, or bills just because everything seems under control today. Delays could create unnecessary pressure later. Take a realistic look at upcoming due dates, responsibilities, and potential expenses. Handling them on time will preserve your peace of mind and keep your financial foundation strong."
    }
  ],

  gemini: [
    {
      type: "general",
      prediction:
        "Communication becomes your greatest strength today, allowing you to express ideas, questions, and opinions with ease. You may find yourself engaged in many conversations, messages, or mental activities that keep you stimulated. People respond well to your adaptability, curiosity, and quick wit. This is a good day for learning, networking, or exploring new interests. Your mind is active and eager, making it ideal for brainstorming and planning short-term changes.",
      challenge:
        "Avoid juggling too many tasks simultaneously, as your attention may scatter and important details can slip through the cracks. Constant switching between activities may leave you feeling mentally drained. Try to prioritize and complete one thing before fully diving into the next. A bit of structure will help you use your mental gifts more effectively."
    },
    {
      type: "career",
      prediction:
        "Fresh ideas and creativity come naturally, helping you solve problems in clever and efficient ways. You may excel in roles that require communication, planning, or quick analysis. This is a favorable time for meetings, presentations, interviews, or collaborations where your words and thoughts can shine. You might also enjoy researching new tools or methods to improve your work. Sharing your insights openly can attract valuable support and opportunities.",
      challenge:
        "Avoid leaving tasks incomplete because you quickly lose interest or become distracted by something new. Your strength lies in ideas, but it is important to follow through on execution as well. Create small milestones to keep yourself engaged until a job is done. Discipline will ensure that your creativity translates into visible results."
    },
    {
      type: "love",
      prediction:
        "Exciting conversations and playful energy improve bonding in relationships, making connections feel lighter and more enjoyable. You may feel drawn to share stories, jokes, or dreams with someone special. This is a great day for heartfelt chats that clarify feelings and bring you closer. If you are single, your social charm can attract interesting and intellectually stimulating people. Expressing yourself honestly yet gently will deepen emotional resonance.",
      challenge:
        "Avoid sending mixed signals or changing your tone too frequently, as this can create confusion or insecurity in the other person. Try to be clear about what you feel and what you want instead of relying purely on playful banter. Consistency in your words and actions will strengthen trust. Honest communication, even in lighthearted form, is key today."
    },
    {
      type: "health",
      prediction:
        "Your mind feels sharp, alert, and eager to absorb information, which enhances productivity in tasks that require focus. You may feel energized by mental challenges, reading, or problem-solving. This is a good time to create healthier habits around your daily schedule and time management. Light physical movement, like stretching between tasks, can keep your body aligned with your active mind. Balancing mental work with short breaks will keep you refreshed throughout the day.",
      challenge:
        "Reduce screen time and constant digital stimulation to prevent mental fatigue, headaches, or restlessness. Too much scrolling or multitasking online may scatter your energy. Set gentle boundaries for when to disconnect and give your mind some quiet time. Quality rest and occasional silence will help you recharge fully."
    },
    {
      type: "finance",
      prediction:
        "It is a relatively stable financial day, giving you an opportunity to review small expenses, subscriptions, or short-term plans. You may feel curious about new ways to manage money or learn financial skills. Light research or conversations about savings, investments, or budgeting can be beneficial now. Making informed, low-pressure decisions will support your long-term stability. Small, sensible improvements can make a meaningful difference.",
      challenge:
        "Avoid impulsive purchases driven by curiosity, boredom, or the desire to try something new just for novelty’s sake. Quick decisions around money may lead to regret later. Before spending, pause and ask whether the item or service truly adds value to your life. A brief moment of reflection can protect your financial balance."
    }
  ],

  cancer: [
    {
      type: "general",
      prediction:
        "You feel deeply connected to your emotional world today, making you more intuitive, sensitive, and nurturing toward yourself and others. It is a comforting day for focusing on home, family, and people who make you feel safe. You may naturally take on a caring role, offering support or a listening ear. This is also a good time for introspection, journaling, or healing old patterns gently. Your empathy is a powerful strength, helping you understand unspoken feelings in your surroundings.",
      challenge:
        "Avoid revisiting old emotional wounds in a repetitive way that only drains your energy instead of healing it. While reflection can be helpful, dwelling on past hurts may make you feel heavy and stuck. Try to focus on what you have learned and how you can move forward. Nourish yourself with positive environments and people who respect your emotional sensitivity."
    },
    {
      type: "career",
      prediction:
        "Your intuition guides you to make thoughtful and people-centered decisions in the workplace. You may sense subtle dynamics in teams, clients, or superiors and respond with care and diplomacy. This is a favorable time for tasks that involve counseling, support, coordination, or emotional intelligence. You could also excel at behind-the-scenes work that keeps everything running smoothly. Trusting your inner sense of timing and approach can help you navigate even complex situations gracefully.",
      challenge:
        "Avoid letting mood swings or personal emotions strongly influence professional choices or behavior. If you feel overwhelmed, take a short break before reacting to emails, messages, or discussions. Try not to take constructive feedback too personally. By balancing heart and practicality, you will maintain both credibility and inner peace."
    },
    {
      type: "love",
      prediction:
        "Love feels warm, soft, and emotionally rich today, making it easier to share your heart with someone special. You may crave closeness, reassurance, and quality time with your partner or a dear one. This is a beautiful day for gentle conversations, affectionate gestures, or revisiting sweet memories together. If single, you may feel drawn to connections that feel emotionally safe and spiritually aligned. Genuine kindness and vulnerability will deepen trust and intimacy.",
      challenge:
        "Avoid taking things too personally, even if the other person’s words or actions are unintentional or neutral. Sensitivity is a gift, but it can also magnify minor issues. Before reacting, pause to consider whether there might be another perspective. Clear and calm communication will prevent misunderstandings and bring you closer."
    },
    {
      type: "health",
      prediction:
        "You enjoy good emotional balance for much of the day, and this inner calm reflects positively on your physical well-being. Gentle activities like stretching, yoga, slow walks, or mindful breathing can help you feel centered. You may also feel drawn to comforting routines that give you a sense of security. This is a good time to prioritize rest, hydration, and home-cooked food. Listening to your emotional needs will support your overall health in subtle but powerful ways.",
      challenge:
        "Avoid stress eating or turning to heavy comfort foods whenever you feel emotional, tired, or nostalgic. While they may provide temporary relief, they can affect your digestion and energy levels. Try to express your feelings through conversation, creative outlets, or self-care practices instead. Mindful choices will help you feel lighter and more balanced."
    },
    {
      type: "finance",
      prediction:
        "It is a favorable day for saving, organizing financial documents, or planning home-related investments and expenses. You may feel motivated to create financial stability for your family or your future security. Conversations about shared resources, such as family budgets, can go smoothly if handled with care. This is also a good time to reflect on what truly makes you feel safe and supported financially. Thoughtful decisions now will create long-term comfort.",
      challenge:
        "Avoid lending money casually or emotionally, especially if you are unsure about the other person’s ability to return it. Emotional attachment can cloud financial judgment. Set healthy boundaries and be clear about your own needs and limits. Protecting your resources is also a part of nurturing yourself."
    }
  ],

  leo: [
    {
      type: "general",
      prediction:
        "Your natural charisma shines brightly today, attracting positive attention and admiration from people around you. You feel confident, expressive, and ready to step into the spotlight in some area of life. This is an excellent time for presenting ideas, showcasing talents, or taking initiative in social situations. Your creativity is also heightened, encouraging you to think boldly and act with passion. If you lead with warmth rather than ego, you can inspire others and create joyful experiences.",
      challenge:
        "Avoid being overly self-focused or craving constant praise, as this may unintentionally overshadow others’ needs and feelings. Remember that true leadership includes humility and the ability to share the stage. Listen when others speak and show appreciation for their contributions. Balanced confidence will make your light even more admirable."
    },
    {
      type: "career",
      prediction:
        "Leadership opportunities may arise at work, and you are well-positioned to step up with courage and vision. Your enthusiasm can motivate colleagues and bring fresh energy to ongoing projects. This is a good time for public-facing tasks, presentations, or creative brainstorming sessions. People may look to you for direction or inspiration, recognizing your natural authority. If you pair your ambition with cooperation, you can move closer to your professional goals in a meaningful way.",
      challenge:
        "Listen carefully to others before making firm decisions or final judgments. Overconfidence may cause you to overlook practical details or alternate viewpoints that could improve the outcome. Make space for feedback, discussion, and collaboration. When you combine your strong will with openness, your leadership becomes truly powerful."
    },
    {
      type: "love",
      prediction:
        "Romantic energy is strong today, and you may feel more expressive, affectionate, and playful with your partner or love interest. This is a great day for thoughtful surprises, heartfelt compliments, or special plans. Your warmth can draw people closer and create memorable moments. If single, your magnetic aura can attract attention from admirers who appreciate your bold heart. Being genuine and generous with your love will make your relationships feel vibrant and alive.",
      challenge:
        "Avoid dramatic reactions or emotional exaggeration when something does not go exactly as you imagined. Small misunderstandings do not need theatrical responses. Try to communicate honestly about what you feel without turning it into a performance. A calm and sincere approach will prevent unnecessary tension and strengthen trust."
    },
    {
      type: "health",
      prediction:
        "Vitality stays high, giving you the strength to engage in physical activities, creative pursuits, or busy schedules with enthusiasm. You may feel more confident about your appearance and energy levels. This is a good day to reconnect with a fitness routine, dance, or any expressive movement you enjoy. Maintaining a balanced daily rhythm with proper meals and hydration will amplify your glow. Prioritizing self-care will help your inner fire burn steadily.",
      challenge:
        "Maintain proper sleep and do not push your body too late into the night just because you feel energetic. Overstretching your limits can lead to fatigue or irritability later. Give yourself time to wind down and relax after intense activity. Respecting your body’s need for rest will support your long-term vitality."
    },
    {
      type: "finance",
      prediction:
        "There is potential for small financial gains, rewards, or recognition that boosts your confidence. You may feel encouraged to invest in self-improvement, image-building, or creative projects. This is a good time to review how your spending aligns with your long-term goals and sense of pride. Thoughtful choices can increase both security and satisfaction. When you view money as a tool rather than a status symbol, it serves you better.",
      challenge:
        "Avoid overspending on luxury items, show-off purchases, or things bought purely to impress others. Emotional or ego-driven spending can disturb your budget even if it feels satisfying in the moment. Pause and consider whether a purchase truly adds value to your life. Wise restraint now will keep your finances healthier in the future."
    }
  ],

  virgo: [
    {
      type: "general",
      prediction:
        "A highly productive day lies ahead, where your natural ability to organize, analyze, and refine things is especially strong. Your structured approach helps you complete tasks smoothly and efficiently, bringing order wherever there is chaos. This is an excellent time to tackle to-do lists, declutter spaces, or improve systems in your personal and professional life. You may feel satisfaction from paying attention to details that others overlook. Your practical mindset makes you a reliable support for those around you.",
      challenge:
        "Avoid slipping into perfectionism or being overly critical of yourself and others, as this may slow progress or create unnecessary stress. Not everything needs to be flawless to be effective. Try to recognize when something is already good enough to move forward. Balancing high standards with self-compassion will keep your energy steady and positive."
    },
    {
      type: "career",
      prediction:
        "Detail-oriented work stands out, and your analytical skills shine in tasks that require accuracy, planning, or troubleshooting. You may be particularly good at spotting errors, improving workflows, or organizing information. This is a great day for documentation, reports, research, or process refinement. Your dedication and sense of responsibility can impress colleagues and superiors. Quiet, disciplined effort now can lead to solid professional growth over time.",
      challenge:
        "Avoid micromanaging others or trying to control every tiny aspect of a project. While your standards are valuable, too much control can create tension or reduce team morale. Trust that others can also contribute meaningfully in their own way. Share guidance and support, but leave room for different working styles."
    },
    {
      type: "love",
      prediction:
        "Clear and honest communication strengthens romantic bonds, especially when you express care through practical actions and thoughtful gestures. You may feel drawn to help your partner with their tasks or support their well-being in concrete ways. This is a good day to talk about routines, habits, or future plans together. Your sincerity and attention to small details can make your loved one feel deeply valued. Emotional warmth grows when you show love through both words and actions.",
      challenge:
        "Overthinking may create unnecessary concerns, especially if you constantly analyze every sentence, reaction, or message. Try not to search for problems where there are none. Instead of imagining worst-case scenarios, ask direct but gentle questions when you feel unsure. Trust, simplicity, and open dialogue will ease your mind."
    },
    {
      type: "health",
      prediction:
        "Digestive energy is relatively strong today, and you may find it easier to maintain a balanced daily routine. This is a good time to review your diet, meal timings, and lifestyle habits with a practical mindset. Light exercise or mindful movement will support your overall system. You may feel more motivated to create schedules for sleep, work, and self-care. Small improvements made consistently will enhance your long-term health.",
      challenge:
        "Limit caffeine or stimulants to avoid nervous restlessness, anxiety, or disrupted sleep. It can be tempting to rely on them to maintain productivity. Instead, focus on natural energy boosters such as hydration, proper meals, and short breaks. Listening to your body’s signals will help you maintain calm focus without strain."
    },
    {
      type: "finance",
      prediction:
        "This is an excellent day for budgeting, reviewing expenses, or planning future financial moves with precision. You can analyze where your money is going and how to optimize savings or investments. Paying attention to small leaks in your budget may help you make smarter choices. Your practical approach supports long-term security and stability. Thoughtful planning now can prevent larger issues later.",
      challenge:
        "Avoid obsessing over tiny expenses or becoming overly anxious about every small financial decision. While awareness is important, excessive worry can drain your mental energy. Focus on the bigger patterns and key priorities rather than perfection in every minor detail. A balanced approach will keep your relationship with money healthy and calm."
    }
  ],

  libra: [
    {
      type: "general",
      prediction:
        "You attract harmony and balance today, and people naturally trust your sense of fairness and perspective. Your ability to see multiple sides of a situation makes you a natural mediator. This is a good time for social interactions, collaborations, and peaceful resolutions. You may feel drawn to beauty, art, or environments that are aesthetically pleasing and calm. Creating balance in your surroundings will also bring inner peace and clarity.",
      challenge:
        "Avoid indecisiveness when important choices need to be made, as delaying decisions may create confusion or missed opportunities. Wanting everything to be perfectly balanced can sometimes stop you from taking any action at all. Trust your judgement and choose what feels most aligned with your values. Even a thoughtful compromise is better than endless hesitation."
    },
    {
      type: "career",
      prediction:
        "Teamwork flows smoothly as you adapt well to collaborative situations and group dynamics. You may play an important role in maintaining harmony, resolving misunderstandings, or bringing people together with diplomacy. This is a favorable day for meetings, negotiations, or partnership-based projects. Your ability to communicate politely yet clearly can create win–win outcomes. When you bring fairness and creativity to the workplace, others respect and appreciate your presence.",
      challenge:
        "Do not avoid necessary confrontation just to keep things pleasant on the surface. Some issues require honest, direct conversation to truly improve. If you express yourself calmly and respectfully, you can address problems without damaging relationships. Standing up for what is right will ultimately support true harmony instead of shallow peace."
    },
    {
      type: "love",
      prediction:
        "Romantic balance and emotional sweetness enhance your relationships, making it a lovely day for shared experiences and affectionate moments. You may feel especially tuned in to your partner’s feelings and needs. This is a good time for date plans, heartfelt talks, or resolving past misunderstandings gently. If you are single, your graceful and charming energy can attract meaningful attention. A warm, cooperative attitude will strengthen emotional bonds.",
      challenge:
        "Avoid constantly seeking validation, reassurance, or approval from your partner or potential partners. While appreciation is important, your self-worth should not depend entirely on others’ responses. Trust the genuine connection you are building and your own value in the relationship. Emotional balance will deepen love on both sides."
    },
    {
      type: "health",
      prediction:
        "A mentally balanced day helps you stay energetic, focused, and receptive to both work and relaxation. You may benefit from activities that combine movement with grace, such as walking in nature, light stretching, or mindful breathing. Surrounding yourself with beauty and order can uplift your mood and energy. This is a good time to adjust routines in a way that feels gentle rather than forceful. Inner harmony supports your overall physical well-being.",
      challenge:
        "Avoid skipping meals or falling into irregular eating patterns due to social plans or indecision about what to eat. Your body needs steady nourishment to maintain balance. Try to choose simple, wholesome options instead of delaying food for too long. Consistency in self-care will keep your energy stable."
    },
    {
      type: "finance",
      prediction:
        "It is a good day for negotiation, fair deals, or reviewing agreements where mutual benefit is important. You have a natural sense of balance that can help you make wise financial choices benefiting all parties involved. This is also a suitable time to plan shared expenses or partnerships. You may gain clarity on how to make your financial life both stable and aesthetically pleasing. Thoughtful decisions now can create peace of mind.",
      challenge:
        "Avoid overspending on aesthetic items, decor, or things that simply look beautiful but are not truly necessary. While beauty is uplifting, it should not come at the cost of financial strain. Before purchasing, ask whether the item truly serves a lasting purpose. A little restraint will help you enjoy both elegance and stability."
    }
  ],

  scorpio: [
    {
      type: "general",
      prediction:
        "Your focus and intensity help you achieve important goals today, as you feel deeply motivated and determined to make progress. You may prefer dealing with meaningful issues rather than superficial matters. This is a powerful time for transformation, research, or uncovering hidden truths. Your emotional depth allows you to understand complex situations and people at a profound level. When you channel this energy constructively, you can initiate lasting changes in your life.",
      challenge:
        "Avoid unnecessary secrecy or holding back information that could help resolve issues more smoothly. While privacy is important, too much mystery can create misunderstandings or distance. Try to share your thoughts honestly with those who have earned your trust. Transparent communication will strengthen bonds rather than weaken your sense of control."
    },
    {
      type: "career",
      prediction:
        "Strong determination helps you complete difficult tasks that others may find exhausting or overwhelming. You are likely to excel in work that involves investigation, strategy, or handling sensitive matters. Your analytical skills impress others, and your ability to stay committed gives you an edge. This is a good day to focus on high-impact responsibilities or long-term plans. Quietly working in depth can lead to powerful results over time.",
      challenge:
        "Avoid clashing with colleagues or superiors due to strong opinions or a desire to control outcomes completely. Intensity can sometimes be interpreted as stubbornness or dominance. Be open to other perspectives and consider where collaboration can strengthen your position. A balance between passion and diplomacy will serve you well."
    },
    {
      type: "love",
      prediction:
        "Passionate energy strengthens bonds, and emotional depth enhances intimacy in your relationships. You may feel a desire for deeper honesty, vulnerability, and commitment with your partner or love interest. This is a powerful day for heart-to-heart conversations, healing past issues, or exploring the spiritual side of love. If single, you may be drawn to mysterious, intense, or transformative connections. Authentic feelings expressed with care can bring beautiful closeness.",
      challenge:
        "Avoid jealousy, suspicion, or the urge to test loyalty unnecessarily, as these behaviors can damage trust. Remind yourself that genuine love grows in an atmosphere of mutual respect and openness. If something worries you, talk about it instead of withdrawing or becoming controlling. Choosing trust over fear will nurture the connection."
    },
    {
      type: "health",
      prediction:
        "High stamina supports physical strength and consistency today, enabling you to handle demanding routines or workouts. You may feel motivated to detox, cleanse, or let go of habits that drain your energy. This is a good time to focus on deep rest, emotional healing, and regenerative activities. Your mind–body connection is strong, so paying attention to feelings can guide you toward healthier choices. When you honor both physical and emotional needs, your resilience grows.",
      challenge:
        "Increase water intake to stay refreshed and help your body process both physical and emotional intensity. Avoid holding tension in your muscles or ignoring signs of stress. Small relaxation practices, like stretching, breathing exercises, or quiet reflection, can prevent burnout. Taking care of your inner world will reflect positively in your body."
    },
    {
      type: "finance",
      prediction:
        "Long-term stability looks promising when you approach finances with strategy and patience. You may be thinking about investments, savings, or plans that transform your material situation over time. This is a good day to research financial options in depth rather than rushing into anything. You are capable of making powerful, well-planned decisions. Wise choices now can slowly but steadily strengthen your financial foundation.",
      challenge:
        "Avoid overly risky, secretive, or emotionally driven investments that you do not fully understand. Desire for control or quick gain can cloud judgement. Be cautious with shared resources or hidden deals that lack transparency. Clarity, honesty, and proper information will protect your long-term security."
    }
  ],

  sagittarius: [
    {
      type: "general",
      prediction:
        "You feel adventurous, optimistic, and eager to explore new possibilities today. Fresh ideas, big-picture thinking, and a desire for freedom may guide your decisions. This is a great time for learning, travel planning, or stepping outside your comfort zone in some way. You are more open to different cultures, philosophies, or perspectives. When you follow your curiosity with wisdom, you can expand your horizons in inspiring ways.",
      challenge:
        "Avoid over-promising or committing to too many things just because you feel upbeat and confident in the moment. Taking on more than you can realistically handle may lead to stress later. Try to balance enthusiasm with practicality and time awareness. Saying yes selectively will keep your energy focused and effective."
    },
    {
      type: "career",
      prediction:
        "Creative approaches help you overcome challenges at work, especially where innovation, teaching, or visionary thinking is needed. You may feel inspired to suggest new strategies, explore opportunities, or connect with people from different backgrounds. This is a good day for planning long-term goals, pitching ideas, or working on projects that involve growth and expansion. Your optimism can motivate others and brighten the professional atmosphere.",
      challenge:
        "Check details carefully to avoid small mistakes that can arise from moving too quickly or focusing only on the big picture. While your broad vision is a gift, practical steps are equally important. Read messages, documents, or contracts thoroughly. A bit of mindful precision will prevent avoidable complications."
    },
    {
      type: "love",
      prediction:
        "Heartfelt, honest, and open conversations bring joy, clarity, and freedom to your relationships. You may feel drawn to discuss dreams, beliefs, or future possibilities with someone special. This is a good day for shared experiences, adventures, or planning something meaningful together. If single, you may be attracted to people who are wise, humorous, or spiritually inclined. Authentic expression and emotional honesty will deepen your connection.",
      challenge:
        "Avoid blunt remarks or unfiltered comments that may unintentionally hurt someone’s feelings. Even if you mean no harm, your straightforward style can come across as insensitive at times. Take a moment to choose your words with kindness. When you combine truth with compassion, your relationships will flourish."
    },
    {
      type: "health",
      prediction:
        "High energy and positivity boost your overall sense of well-being, making you more inclined to be active and engaged. Outdoor activities, sports, or movement in open spaces can be especially refreshing. You may also feel mentally uplifted, which supports your physical health. This is a good time to adopt habits that connect body, mind, and spirit, such as walking in nature or mindful exercise. Enjoying movement will help you stay fit without feeling restricted.",
      challenge:
        "Do not skip warm-ups, stretching, or proper technique before physical activities, no matter how enthusiastic you feel. Rushing into intense exercise can lead to unnecessary strain or minor injury. Take a little time to prepare your body and cool down afterward. Respecting these basics will keep your energy sustainable."
    },
    {
      type: "finance",
      prediction:
        "Finances remain relatively stable, giving you some room to think about travel, education, or experiences that broaden your understanding of life. You may feel drawn to invest in knowledge, courses, or meaningful journeys. This is a good time for planning rather than impulsive action. Wise spending on growth-oriented activities can be beneficial in the long run. Carefully chosen experiences may enrich you more than material objects.",
      challenge:
        "Avoid overspending on travel, leisure, or spontaneous experiences without considering long-term responsibilities. While enjoyment is important, balance it with financial discipline. Create a simple plan or limit before indulging. This will allow you to have fun without regret later."
    }
  ],

  capricorn: [
    {
      type: "general",
      prediction:
        "A disciplined, focused mindset brings steady progress toward your long-term goals today. You may feel strongly motivated to work hard, plan ahead, and take responsibility in important areas of life. This is a favorable time for structure, organization, and practical efforts. Your patience and persistence stand out, making you someone others can depend on. When you invest your energy wisely, you move closer to the success you are building step by step.",
      challenge:
        "Avoid overworking or carrying all burdens alone, as this can gradually lead to exhaustion or emotional isolation. Responsibility is admirable, but balance is essential. Make time for rest, connection, and small joys along the way. Sharing tasks or concerns with trusted people will lighten your load."
    },
    {
      type: "career",
      prediction:
        "Your consistency, dedication, and professionalism earn recognition from seniors, clients, or colleagues. This is an excellent day to handle important responsibilities, make strategic decisions, or work on long-term plans. You may feel more comfortable taking on leadership roles or setting high standards for yourself. Your ability to stay committed even in tough conditions is a major strength. Quiet, determined effort now can open doors to future advancement.",
      challenge:
        "Avoid being too rigid or resistant to new methods, ideas, or changes in your work environment. Flexibility can sometimes increase efficiency rather than threaten stability. Listen to suggestions from others and consider where adaptation could actually support your goals. A balanced approach will keep you both strong and relevant."
    },
    {
      type: "love",
      prediction:
        "Small, thoughtful gestures create deeper emotional bonding in your relationships, even if you are not overly dramatic in expressing feelings. You may show love through reliability, support, or practical help. This is a good day for serious conversations about shared goals, commitment, or future responsibilities. Stability and loyalty make your partner feel secure and valued. If single, you may be drawn to mature, grounded, and responsible individuals.",
      challenge:
        "Avoid emotional distance or becoming so focused on work and duties that you neglect emotional expression. Your loved ones may need verbal reassurance or affection, not just silent support. Make a conscious effort to share what you feel in words or soft actions. Emotional openness will strengthen connection and understanding."
    },
    {
      type: "health",
      prediction:
        "Strong endurance supports productivity throughout the day, helping you stay committed to tasks and routines. You may feel more willing to follow disciplined habits around food, sleep, and exercise. This is a good time to set realistic health goals and work steadily toward them. Even small improvements made regularly can create powerful long-term benefits. Your sense of responsibility toward your body can be a great asset now.",
      challenge:
        "Take short breaks to prevent burnout, stiffness, or mental fatigue from prolonged work. Pushing yourself without pause can decrease efficiency over time. Listen to your body when it signals the need for rest or movement. Balancing effort with recovery will keep you stronger overall."
    },
    {
      type: "finance",
      prediction:
        "It is a good day for investment planning, long-term savings strategies, or reviewing financial structures with a practical eye. You are more inclined to think about security, stability, and future responsibilities. Careful decision-making can help you lay a solid foundation for years to come. You may prefer slow, steady growth over risky shortcuts. Responsible financial behavior today will reward you later.",
      challenge:
        "Avoid unnecessary financial risks, shortcuts, or speculative ventures that promise quick returns without solid backing. Your strength lies in patience and structure, not gambles. Before committing money, review all relevant information calmly. Staying true to your cautious wisdom will protect your resources."
    }
  ],

  aquarius: [
    {
      type: "general",
      prediction:
        "Your mind blooms with innovative ideas, and you may feel inspired to think outside the box or challenge old patterns. This is a good day for exploring unconventional perspectives, experimenting with new methods, or engaging with technology and communities. You may also feel more connected to social causes, friendships, or group activities. Your unique vision can spark exciting changes if shared wisely. Let your originality guide you while staying true to your values.",
      challenge:
        "Avoid emotional detachment or distancing yourself too much from people who care about you. While logic and independence are important, relationships also need warmth and presence. Make an effort to connect on a personal level, not just intellectually. Balancing heart and mind will create healthier dynamics."
    },
    {
      type: "career",
      prediction:
        "Your originality and forward-thinking approach impress colleagues, superiors, or clients today. This is a great time for brainstorming, planning, or contributing fresh ideas to team projects. You may excel in areas involving innovation, technology, networks, or social impact. Collaborating with like-minded people can lead to inspiring breakthroughs. When you trust your unique vision, you become a valuable asset in any professional setting.",
      challenge:
        "Keep practicality in check and avoid getting carried away by ideas that are exciting but not yet realistic or structured. Take a moment to consider resources, timing, and feasibility before committing. Be open to feedback that grounds your concepts. A blend of creativity and practicality will give your ideas real-world power."
    },
    {
      type: "love",
      prediction:
        "Refreshing emotional openness adds spark to your relationships, making them feel more alive and mentally stimulating. You may enjoy honest, unconventional, or future-focused conversations with your partner or love interest. This is a good day to try something different together, whether in activities or communication style. If single, you may attract people who are intellectually vibrant, unique, or socially aware. Freedom, respect, and shared ideals will deepen bonds.",
      challenge:
        "Avoid unpredictability in your behavior or disappearing emotionally when you feel overwhelmed. Sudden changes in mood or communication can confuse your partner. Even if you need space, express it clearly and kindly. Consistency and transparency will help maintain trust while honoring your individuality."
    },
    {
      type: "health",
      prediction:
        "Good mental clarity enhances focus, creative thinking, and problem-solving today. You may feel drawn to activities that stimulate both mind and body, such as walking while thinking, light exercise with music, or learning something new. This is a good time to strengthen habits that support nervous system balance, like proper sleep and digital boundaries. A sense of mental freedom will contribute positively to your physical well-being.",
      challenge:
        "Fix your sleep cycle and avoid irregular patterns that may cause fatigue, anxiety, or lack of concentration over time. Staying up too late with screens or overthinking can disturb your rest. Try to create a calming pre-sleep routine and limit stimulation before bed. Quality sleep will help you use your brilliant mind more effectively."
    },
    {
      type: "finance",
      prediction:
        "It is a stable day for financial planning, especially in areas related to technology, innovation, or long-term projects. You may think about investing in tools, education, or networks that support your future vision. Careful research can help you make wise, forward-looking choices. Balancing idealism with realism will bring you closer to your goals. Thoughtful planning now can support both personal freedom and security.",
      challenge:
        "Avoid impulsive investments in gadgets, technology, or experimental ventures just because they seem trendy or exciting. Take time to understand the true value and necessity behind each expense. Question whether the purchase genuinely serves your growth or is just a momentary attraction. Disciplined decisions will protect your resources."
    }
  ],

  pisces: [
    {
      type: "general",
      prediction:
        "You feel calm, creative, and deeply intuitive today, making it an ideal time for artistic work, spiritual practices, or quiet reflection. Your imagination is rich, and you may find inspiration in music, dreams, or subtle signs around you. Compassion and empathy flow naturally, drawing you toward helping others or offering gentle support. This is a good day to reconnect with your inner world and listen to your instincts. When you honor your sensitivity, it becomes a source of strength instead of overwhelm.",
      challenge:
        "Avoid slipping into fantasy, escapism, or wishful thinking that pulls you away from practical realities. While dreaming is beautiful, ignoring responsibilities can create problems later. Try to ground your visions by taking small, realistic steps toward them. A balance between imagination and action will serve you best."
    },
    {
      type: "career",
      prediction:
        "Your intuition helps you make subtle, smart decisions at work, especially in situations that are emotionally complex or unclear. You may excel in creative, healing, or service-oriented roles today. Tasks requiring empathy, imagination, or behind-the-scenes support can feel naturally aligned. This is a good time to bring gentle innovation to your professional environment. Quietly reading the emotional tone of people and situations will guide you toward wise choices.",
      challenge:
        "Avoid giving vague instructions, unclear responses, or leaving tasks undefined, as this can cause confusion for others. Even if everything is clear in your mind, others may need more structure. Try to communicate expectations, timelines, and details more concretely. Clarity will help your talents be recognized and appreciated."
    },
    {
      type: "love",
      prediction:
        "Romantic softness flows, making it a beautiful day for emotional bonding, shared dreams, and tender moments. You may feel more affectionate, poetic, or spiritually connected to your partner or love interest. This is a good time for heartfelt confessions, compassionate listening, or simply being present with someone you care about. If single, you may be drawn to soulful, gentle, or artistic individuals. Love feels more meaningful when it touches both heart and spirit.",
      challenge:
        "Avoid insecurity, self-doubt, or silent assumptions that can create distance in relationships. If something worries you, gently express it rather than withdrawing into your own thoughts. Give people a chance to reassure you with their words and actions. Trust, openness, and kindness will deepen your emotional connection."
    },
    {
      type: "health",
      prediction:
        "Emotional well-being strongly supports your overall health today, making inner peace especially important. Gentle activities like meditation, slow walks, stretching, or creative hobbies can keep you centered and relaxed. You may benefit from calming music, soothing environments, or time near water or nature. This is a good day to rest your nervous system and recharge softly. Listening to your emotional signals will guide you toward what your body truly needs.",
      challenge:
        "Do not skip meals, ignore hydration, or fall into irregular eating patterns because you are daydreaming, distracted, or emotionally overwhelmed. Your body needs steady nourishment to stay balanced. Try to maintain a simple but consistent routine around food and rest. Caring for your physical needs will also stabilize your emotions."
    },
    {
      type: "finance",
      prediction:
        "Finances remain relatively stable, with potential for small gains or thoughtful decisions that improve security. You may feel inclined to approach money matters with sensitivity and intuition, considering both emotional and practical factors. This is a good time for gentle planning, reviewing spending patterns, or setting compassionate financial boundaries. Making calm, conscious choices will support your long-term peace.",
      challenge:
        "Avoid impulsive lending, emotional financing, or spending money to rescue, impress, or please others at your own expense. Your generous heart can sometimes overlook your own limits. Before making any financial promise, check whether it is truly sustainable for you. Protecting your resources is also an act of self-respect."
    }
  ]
};



export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Dummy horoscope data (TEMP MODE)",
    data: FALLBACK
  });
}
