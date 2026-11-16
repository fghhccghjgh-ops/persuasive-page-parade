import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, Plus, RefreshCw, RotateCcw } from 'lucide-react';

interface Mission {
  id: string;
  etapa: string;
  title: string;
  minutes: number;
  day: string;
  completed: boolean;
}

interface GoalPlan {
  id: string;
  title: string;
  dailyMinutes: number;
  daysPerWeek: number;
  adaptedNote: string | null;
  missions: Mission[];
}

const STORAGE_KEY = 'delux_app_goals_v1';

const DEFAULT_PLANS: GoalPlan[] = [
  {
    id: 'english-default',
    title: 'Aprender Inglês na Prática',
    dailyMinutes: 25,
    daysPerWeek: 4,
    adaptedNote: null,
    missions: [
      {
        id: 'm1',
        etapa: 'Etapa 01 · Base Auditiva',
        title: 'Ouvir diálogo curto (4 min) e anotar 6 expressões reais',
        minutes: 20,
        day: 'SEG',
        completed: true,
      },
      {
        id: 'm2',
        etapa: 'Etapa 01 · Base Auditiva',
        title: 'Repetir em voz alta as 6 expressões dentro de frases simples',
        minutes: 20,
        day: 'QUA',
        completed: false,
      },
      {
        id: 'm3',
        etapa: 'Etapa 02 · Produção Guiada',
        title: 'Gravar áudio de 45s respondendo 3 perguntas do cotidiano',
        minutes: 25,
        day: 'SEX',
        completed: false,
      },
      {
        id: 'm4',
        etapa: 'Etapa 03 · Consolidação',
        title: 'Revisar vocabulário da semana e simular 1 conversa curta',
        minutes: 25,
        day: 'SÁB',
        completed: false,
      },
    ],
  },
];

function buildMissionsForGoal(title: string, dailyMinutes: number, daysPerWeek: number): Mission[] {
  const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].slice(0, Math.max(2, Math.min(7, daysPerWeek)));
  const templates = [
    { etapa: 'Etapa 01 · Clareza Inicial', title: `Mapear os 3 fundamentos essenciais de "${title}"` },
    { etapa: 'Etapa 01 · Primeiro Passo', title: `Executar bloco focado inicial sem distrações` },
    { etapa: 'Etapa 02 · Prática Guiada', title: `Aplicar o conhecimento em 1 exercício concreto` },
    { etapa: 'Etapa 02 · Construção de Ritmo', title: `Consolidar técnica principal e registrar dúvidas` },
    { etapa: 'Etapa 03 · Consolidação', title: `Revisar avanços da semana e definir próximo marco` },
  ];

  return days.map((day, idx) => {
    const tpl = templates[idx % templates.length];
    return {
      id: `${Date.now()}-${idx}`,
      etapa: tpl.etapa,
      title: tpl.title,
      minutes: dailyMinutes,
      day,
      completed: false,
    };
  });
}

interface DeluxAppPageProps {
  onNavigateHome: () => void;
}

export function DeluxAppPage({ onNavigateHome }: DeluxAppPageProps) {
  const [plans, setPlans] = useState<GoalPlan[]>(DEFAULT_PLANS);
  const [loaded, setLoaded] = useState(false);

  const [activePlanId, setActivePlanId] = useState<string>(DEFAULT_PLANS[0].id);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState(25);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [showNewForm, setShowNewForm] = useState(false);

  // Read saved plans after hydration so server and browser render the same first frame.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPlans(parsed);
          setActivePlanId(parsed[0].id);
        }
      }
    } catch {
      // Fallback to default plan
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch {
      // Ignore storage errors
    }
  }, [plans, loaded]);

  const activePlan = useMemo(
    () => plans.find((p) => p.id === activePlanId) || plans[0],
    [plans, activePlanId],
  );

  const progressPct = useMemo(() => {
    if (!activePlan || activePlan.missions.length === 0) return 0;
    const done = activePlan.missions.filter((m) => m.completed).length;
    return Math.round((done / activePlan.missions.length) * 100);
  }, [activePlan]);

  const toggleMission = (missionId: string) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id !== activePlan.id
          ? plan
          : {
              ...plan,
              missions: plan.missions.map((m) =>
                m.id === missionId ? { ...m, completed: !m.completed } : m,
              ),
            },
      ),
    );
  };

  const adaptForLessTime = () => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id !== activePlan.id
          ? plan
          : {
              ...plan,
              adaptedNote: 'Missões comprimidas para blocos de 15 min sem quebrar sua sequência.',
              missions: plan.missions.map((m) =>
                m.completed ? m : { ...m, minutes: Math.min(15, m.minutes) },
              ),
            },
      ),
    );
  };

  const adaptMissedDay = () => {
    const dayShift: Record<string, string> = {
      SEG: 'TER',
      TER: 'QUA',
      QUA: 'QUI',
      QUI: 'SEX',
      SEX: 'SÁB',
      SÁB: 'DOM',
      DOM: 'SEG',
    };
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id !== activePlan.id
          ? plan
          : {
              ...plan,
              adaptedNote: 'Próximas missões realocadas automaticamente para o dia seguinte.',
              missions: plan.missions.map((m) =>
                m.completed ? m : { ...m, day: dayShift[m.day] || m.day },
              ),
            },
      ),
    );
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newGoalTitle.trim();
    if (!trimmed) return;

    const created: GoalPlan = {
      id: `goal-${Date.now()}`,
      title: trimmed,
      dailyMinutes,
      daysPerWeek,
      adaptedNote: null,
      missions: buildMissionsForGoal(trimmed, dailyMinutes, daysPerWeek),
    };

    setPlans((prev) => [created, ...prev]);
    setActivePlanId(created.id);
    setNewGoalTitle('');
    setShowNewForm(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-14 border-b border-foreground/10 bg-background/95 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-display text-base font-semibold tracking-[0.22em] text-foreground whitespace-nowrap shrink-0">
              DELUX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs text-ink-400 hover:text-foreground transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Página comercial</span>
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm((v) => !v)}
              className="px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-ink-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo objetivo</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 space-y-10">
        {showNewForm && (
          <form
            onSubmit={handleCreateGoal}
            className="rounded-3xl delux-surface p-6 sm:p-8 space-y-5"
          >
            <div className="font-display text-xl font-medium text-foreground">
              Transformar novo objetivo em caminho prático
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <label className="block text-xs text-ink-400 mb-1.5">Onde você quer chegar</label>
                <input
                  type="text"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Ex.: Começar a treinar, lançar meu projeto..."
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-foreground/15 text-sm text-foreground focus:outline-none focus:border-foreground/50"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-ink-400 mb-1.5">Minutos por dia</label>
                <select
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-foreground/15 text-sm text-foreground focus:outline-none focus:border-foreground/50"
                >
                  <option value={15}>15 min</option>
                  <option value={25}>25 min</option>
                  <option value={45}>45 min</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-ink-400 mb-1.5">Dias por semana</label>
                <select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-background/60 border border-foreground/15 text-sm text-foreground focus:outline-none focus:border-foreground/50"
                >
                  <option value={3}>3 dias</option>
                  <option value={4}>4 dias</option>
                  <option value={5}>5 dias</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold uppercase tracking-[0.12em] hover:bg-ink-200 transition-colors cursor-pointer"
              >
                Gerar caminho prático
              </button>
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2.5 text-xs text-ink-400 hover:text-foreground transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Goal Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActivePlanId(plan.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                plan.id === activePlan.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-ink-950 text-ink-400 border-foreground/10 hover:text-foreground'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        {/* Active Plan Overview & Adaptive Controls */}
        <div className="rounded-3xl delux-surface p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-foreground/10">
            <div>
              <div className="font-mono-tabular text-xs text-ink-400 uppercase tracking-[0.18em]">
                CAMINHO ATIVO
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-semibold text-foreground mt-2">
                {activePlan.title}
              </h1>
              <div className="mt-2 text-xs text-ink-400 font-mono-tabular">
                {activePlan.dailyMinutes} min/dia · {activePlan.daysPerWeek} dias/semana
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-3">
              <div className="font-display font-mono-tabular text-3xl sm:text-4xl font-semibold text-foreground">
                {progressPct}%
              </div>
              <div className="w-44 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-ink-400">
              {activePlan.adaptedNote || 'Sua rotina está sincronizada com o seu ritmo atual.'}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={adaptMissedDay}
                className="px-3.5 py-2 rounded-xl border border-foreground/15 bg-background/50 text-xs text-ink-200 hover:border-foreground/40 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Perdi um dia</span>
              </button>
              <button
                type="button"
                onClick={adaptForLessTime}
                className="px-3.5 py-2 rounded-xl border border-foreground/15 bg-background/50 text-xs text-ink-200 hover:border-foreground/40 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Menos tempo hoje</span>
              </button>
            </div>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          {activePlan.missions.map((mission) => (
            <button
              key={mission.id}
              type="button"
              onClick={() => toggleMission(mission.id)}
              className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                mission.completed
                  ? 'bg-foreground/[0.04] border-foreground/10 opacity-70'
                  : 'delux-surface hover:border-foreground/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    mission.completed
                      ? 'bg-foreground border-foreground text-background'
                      : 'border-foreground/30 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono-tabular text-xs text-ink-400">{mission.etapa}</div>
                  <div
                    className={`mt-1 text-base sm:text-lg font-medium ${
                      mission.completed ? 'line-through text-ink-400' : 'text-foreground'
                    }`}
                  >
                    {mission.title}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 font-mono-tabular">
                <div className="text-xs text-foreground">{mission.day}</div>
                <div className="text-xs text-ink-500 mt-0.5">{mission.minutes} min</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
